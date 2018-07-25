var socket = io();

socket.on('connect',function(){
    console.log('connected to server');


});


socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(dataGotten){
  console.log('Got message from server to user: ',dataGotten);

  var li = jQuery('<li></li>');
  li.text(`${dataGotten.from}: ${dataGotten.text}`);
  jQuery('#messages').append(li);
});


// socket.on('typeMessageFromAdmin', function(adminMessage){
//     console.log("The ADMIN SAYS: ", adminMessage.text);
// });

// socket.emit('createMessage',{
//   from: 'Lamar',
//   text: 'Go rob some motherfuckers nigga'
// },
// function(messageFromAcknoledgement){
//   console.log(messageFromAcknoledgement);
// });

jQuery('#messageForm').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: jQuery('[name=sender]').val(),
    text: jQuery('[name=message]').val()
  },function(text){
    console.log(text);
  });
  jQuery('[name=message]').val('');
});
