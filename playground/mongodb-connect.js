// const MongoClient = require('mongodb').MongoClient;
//ES6 object destructing,lets you pull out properties from an object into a variable
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name:'Pavitar',age:25};
// var {name} = user;

// console.log(name);

MongoClient.connect(`mongodb://localhost:27017/TodoApp`,(err, client)=>{
    if(err){
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db(`TodoApp`);
    // db.collection('ToDos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // },(err,res)=>{
    //     if(err){
    //         return console.log(`Unable to insert todo: ${err}`);
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    db.collection('Users').insertOne({
        name:'Pavitar Dua',
        age: 28,
        location:'Dadar East'
    },(err,res)=>{
        if(err){
            return console.log(`Unable to insert user: ${err}`);
        }
        console.log(res.ops[0]._id.getTimestamp());
    });
    client.close();
});