const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5aeff5b399c718084b08e708';


// Todo.find({
//     _id:id //convert sting into an Object ID
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id:id //convert sting into an Object ID
// }).then((todo)=>{
//     console.log('Todo', todo);
// });
// if(!ObjectID.isValid(id)){
//     console.log('Id not valid');
// }
// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found!');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e)=>console.log(e));

User.findById('5aefd297c58cae03f4bfdfa2').then((user)=>{
    if(!user){
        return console.log('Id not found!');
    }
    console.log('User By Id', user);
}).catch((e)=>console.log(e));
