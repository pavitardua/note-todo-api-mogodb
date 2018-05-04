// const MongoClient = require('mongodb').MongoClient;
//ES6 object destructing,lets you pull out properties from an object into a variable
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,(err, client)=>{
    if(err){
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db(`TodoApp`);
    // db.collection('ToDos').find({
    //     _id: new ObjectID('5aec3f336e219c06c54a7908')
    // }).toArray().then((document)=>{
    //     console.log('ToDos');
    //     console.log(JSON.stringify(document,undefined,2));
    // },(err)=>{
    //     console.log(`Unable to fetch docs: ${err}`)
    // });

    // db.collection('ToDos').find()
    // .count()
    // .then((count)=>{
    //     console.log(`ToDos count: ${count}`);
    // },(err)=>{
    //     console.log(`Unable to fetch docs: ${err}`)
    // });

    db.collection('Users').find({name:'Mike'})
    .toArray()
    .then((document)=>{
        console.log('Users');
        console.log(JSON.stringify(document,undefined,2));
    },(err)=>{
        console.log(`Unable to fetch docs: ${err}`)
    });
   // client.close();
});