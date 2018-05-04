// const MongoClient = require('mongodb').MongoClient;
//ES6 object destructing,lets you pull out properties from an object into a variable
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,(err, client)=>{
    if(err){
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db(`TodoApp`);
    // db.collection('ToDos').deleteMany({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    // db.collection('ToDos').deleteOne({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    // db.collection('ToDos').findOneAndDelete({_id:new ObjectID("5aec4fb5ba50177e3fa512a1")}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name:'Pavitar Dua'}).then((result)=>{
        console.log(result);
    });
    db.collection('Users').findOneAndDelete({_id:new ObjectID("5aec3fdeb9010806c7e7b7fd")}).then((result)=>{
        console.log(result);
    });
   // client.close();
});