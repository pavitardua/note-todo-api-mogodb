const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos1 = [{
    _id: new ObjectID(),
    text:'First test to do'
},{
    _id: new ObjectID(),    
    text:'Second test to do'    
}
];

//testing lifecycle method
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos1);
    }).then(()=>done());
});

describe('POST /todos',()=>{
   
    it('should create a new todo',(done)=>{
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text}) // converted to json by supertest
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos)=>{
               expect(todos.length).toBe(1);
               expect(todos[0].text).toBe(text);                
               done();
            }).catch((e) => done(e));    
        });
    });

    it('should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
               expect(todos.length).toBe(2); 
               done();
            }).catch((e) => done(e)); 
        });
    });
});

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
});

describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos1[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos1[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString()+1;       
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id',()=>{
    it('should delete todo doc',(done)=>{
        var hexId = todos1[1]._id.toHexString();
       // console.log(hexId);
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then((todo) => {
                console.log(todo);
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
        });     
    });

    it('should return 404 if todo not found',(done)=>{
        var hexId = new ObjectID().toHexString()+1;       
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);        
    });    

    it('should return 404 if object id is invalid',(done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });        
});