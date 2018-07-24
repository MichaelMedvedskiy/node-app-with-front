var socket = io();

socket.on('connect',function(){
    console.log('connected to server');

    socket.emit('createMessage',{
      from: 'Misha',
      text: 'You got mail'
    });

});


socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(dataGotten){
  console.log('Got message from server to user: ',dataGotten);

});
