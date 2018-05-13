const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');
var userOneId = new ObjectID();
var userTwoId = new ObjectID();
const users = [{
    _id:userOneId,
    name :'andrew',
    email :'andrew@example.com',
    password :'userOnePass',
    tokens : [{
        access:'auth',
        token: jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
},{
    _id : userTwoId,
    name :'Jen',
    email :'jen@example.com',
    password :'userTwoPass'
}];

const todos1 = [{
    _id: new ObjectID(),
    text:'First Test to do'
},{
    _id: new ObjectID(),    
    text:'Second Test to do',
    completed:true,
    completedAt:333    
}];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos1);
    }).then(()=>done());
};

const populateUsers = (done) => {
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    }).then(()=>done());
};
module.exports = {todos1,populateTodos,users,populateUsers};