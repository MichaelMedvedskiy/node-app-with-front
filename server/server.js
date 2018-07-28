const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, './../public');
const {isRealString} = require('./utils/validation.js');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const express = require('express');
const port = process.env.PORT || 3000;


const {generateMessage, generateLocationMessage} =require('./utils/message.js');

console.log(__dirname+'/../public');

console.log(publicPath);

app = express();

var server = http.createServer(app);
var io = socketIO(server);


var users = new Users();

io.on('connection', (socket)=>{
console.log('New user connected');
socket.on('join',(params,callback)=>{

  if(!(isRealString(params.name) && isRealString(params.room))){
    return callback('Напиши валидные имя и имя хаты');
  }
  console.log(params.room);


  socket.join(params.room);
  users.removeUser(socket.id);
  console.log(socket.id);
  users.addUser(socket.id, params.name,params.room);

  io.to(params.room).emit('updateUserList',users.getUserList(params.room));
  socket.emit('newMessage',generateMessage('Admin','Greetings! Welcome to my board!'));

  socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} joined the crue!`));



  callback();
});




// socket.emit('typeMessageFromAdmin',{
//   text:"Greetings! Welcome to my board!",
//   createdAt: new Date().getTime()
// });
//
// socket.broadcast.emit('typeMessageFromAdmin',{
//   text:"Another user joined the crue!",
//   createdAt: new Date().getTime()
// });
//


socket.on('disconnect',()=>{
    console.log('User disconnected');
    //socket.broadcast.to(params.room).emit('userLeft',params.name);

    var userThatLeft = users.removeUser(socket.id);
    if(userThatLeft){

      console.log('The room that was left: ',userThatLeft.name);
        socket.broadcast.to(userThatLeft.room).emit('newMessage',{
                from: 'Admin',
                text:`${userThatLeft.name} left the chat.`
              });

              io.to(userThatLeft.room).emit('updateUserList',users.getUserList(userThatLeft.room));
            }

});

socket.on('createMessage',(message,triggerAcknoledgementForCounterpartSocket)=>{

console.log('Got message from user on server: ', message);


var user = users.getUser(socket.id);

//Sending info to all connections
  io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
//Sending info to all but one socket
    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    triggerAcknoledgementForCounterpartSocket('this is from the server');

  });

socket.on('createLocationMessage', (coords,triggerAcknoledgementForCounterpartSocket)=>{

  var user = users.getUser(socket.id);

  io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  triggerAcknoledgementForCounterpartSocket('zevs');
});





});





app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log('app is up on port ',port);
});
