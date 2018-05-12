const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcryptjs');

var password = '123abc!';

// bcyrpt.genSalt(10,(err,salt)=>{
//     bcyrpt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$bKHLEapPteqnBc2F.ZIJuu9bgTsD0XZbEc3FiXT9Tz9pML2ni3jg2';

bcyrpt.compare(password,hashedPassword,(err,res)=>{
    if(err){

    }
    console.log(res);
});
// var message = {
//     id:3
// };
// var token = jwt.sign(message,'123abc');
// console.log(token);

// var decoded = jwt.verify(token,'123abc');
// console.log('decoded', decoded);
// var message = 'I am user #3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id:4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// };

// //token.data.id = 5;
// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()

// if(resultHash === token.hash){
//     console.log(`Ok:Data was not changed`);
// }else{
//     console.log(`Warning: Data was changed`);
// }