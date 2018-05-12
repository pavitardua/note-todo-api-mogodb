require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const PORT = process.env.PORT;
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
//POST /users
app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['name','email','password']);
    var user = new User(body);

    user.save().then(()=>{
       return user.generateAuthToken();
    })
    .then((token)=>{
        res.header('x-auth', token).send(user);
    })
    .catch((e)=>{
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
//PATCH /todos/:id
app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    //give permissions only to certain properties 
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    //only if it's updated 
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body},{new:true})
    .then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });

});

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
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