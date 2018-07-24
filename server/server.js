const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, './../public');

const socketIO = require('socket.io');

const express = require('express');
const port = process.env.PORT || 3000;

console.log(__dirname+'/../public');

console.log(publicPath);

app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
console.log('New user connected');




socket.on('disconnect',()=>{
    console.log('User disconnected');
});

socket.on('createMessage',(message)=>{

console.log('Got message from user on server: ', message);

  });

  socket.emit('newMessage',{
    from: 'Jenya',
    text: 'test message',
    createdAt: 123
  });


});





app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log('app is up on port ',port);
});
