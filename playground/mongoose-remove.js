const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//remove all documents
// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

Todo.findOneAndRemove({_id:"5af69e06734d1d04f610aaa8"})
.then((todo)=>{
    
});

Todo.findByIdAndRemove("5af69e06734d1d04f610aaa8")
.then((todo)=>{
    console.log(todo);
});