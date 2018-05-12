const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  //console.log(req.body); 
  var todo = new Todo({
      text: req.body.text,
      completed: req.body.completed
  });

  todo.save().then((doc)=>{
        res.send(doc);
  },(e)=>{
        res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    }); 
});

app.post('/users',(req,res)=>{
    //console.log(req.body); 
    var user = new User({
        name: req.body.name,
        email: req.body.email
    });
  
    user.save().then((doc)=>{
          res.send(doc);
    },(e)=>{
          res.status(400).send(e);
    });
  });
//GET /todos/
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo)=>{
        res.send({todo});
    },(e)=>{
        res.status(404).send(e);
    });
});
//DELETE /todos/:id
app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        res.send({todo});
    },(e)=>{
        res.status(400).send(e);
    });    
});

app.listen(PORT,()=>{
    console.log(`Started on port ${PORT}`);
});

// var newTodo = new Todo({
//     text:"Eat Lunch",
//     completed:false
// });

// newTodo.save().then((doc)=>{
//     console.log('Saved todo',doc);
// },(e)=>{
//     console.log('Unable to Save Todo');
// });

// newTodo = new Todo({
//     text:true
    // text:"Morning Walk",
    // completed:true,
    // completedAt:12345
// });

// newTodo.save().then((doc)=>{
//     console.log('Saved todo',doc);
// },(e)=>{
//     console.log('Unable to Save Todo');
// });


// var newUser = new User({
//     name:'Pavitar Dua ',
//     email:'pavitar@mobiuso.com'
// });

// newUser.save().then((doc)=>{
//     console.log('Saved user',doc);
// },(e)=>{
//     console.log('Unable to Save user');
// });

module.exports = {app};