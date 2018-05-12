const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb://localhost:27017/TodoApp');
// mongodb://<dbuser>:<dbpassword>@ds217310.mlab.com:17310/notes-todo-api
module.exports.mongoose = {mongoose};
