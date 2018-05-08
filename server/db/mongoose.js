const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://<pavitar>:<vicsach>@ds217310.mlab.com:17310/notes-todo-api');
// mongodb://<dbuser>:<dbpassword>@ds217310.mlab.com:17310/notes-todo-api
module.exports.mongoose = {
    mongoose
};