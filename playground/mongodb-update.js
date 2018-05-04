// const MongoClient = require('mongodb').MongoClient;
//ES6 object destructing,lets you pull out properties from an object into a variable
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect(`mongodb://localhost:27017/TodoApp`,(err, client)=>{
    if(err){
        return console.log(`Unable to connect to MongoDB server`);
    }
    console.log(`Connected to MongoDB server`);
    const db = client.db(`TodoApp`);
    // db.collection('ToDos').findOneAndUpdate({
    //         text:'Something to do'
    //     },{
    //         $set:{
    //             completed:true
    //         }
    //     },{
    //         returnOriginal:false
    //     })
    // .then((res)=>{
    //     console.log(res);
    // });
    db.collection('Users').findOneAndUpdate({
        name:'John'
    },{
        $set:{
            name:'Pavitar'
        },$inc:{
            age:1
        }
    },{
        returnOriginal:false
    })
    .then((res)=>{
        console.log(res);
    });
   // client.close();
});