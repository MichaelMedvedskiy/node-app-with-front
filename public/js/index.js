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


socket.on('newLocationMessage',function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Я сейчас сдесь</a>');
  li.text(`${message.from} : `);
  a.attr('href', message.url);
  li.append(a);
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
    jQuery('[name=message]').val('');

  });

});


var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending your personal data');

  navigator.geolocation.getCurrentPosition(function(position){

  //  console.log(position);
  socket.emit('createLocationMessage',{
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  },function(text){
    locationButton.removeAttr('disabled').text('Send location');
    console.log(text);
  });

  },function(){
    alert('Unable to fetch the location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});
