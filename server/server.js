const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, './../public');

const socketIO = require('socket.io');

const express = require('express');
const port = process.env.PORT || 3000;


const {generateMessage} =require('./utils/message.js');

console.log(__dirname+'/../public');

console.log(publicPath);

app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
console.log('New user connected');


socket.emit('newMessage',generateMessage('Admin','Greetings! Welcome to my board!'));

socket.broadcast.emit('newMessage',generateMessage('Admin', 'Another user joined the crue!'));


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
});

socket.on('createMessage',(message,triggerAcknoledgementForCounterpartSocket)=>{

console.log('Got message from user on server: ', message);




//Sending info to all connections
  io.emit('newMessage',generateMessage(message.from,message.text));
//Sending info to all but one socket
    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    triggerAcknoledgementForCounterpartSocket('this is from the server');

  });




});





app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log('app is up on port ',port);
});
