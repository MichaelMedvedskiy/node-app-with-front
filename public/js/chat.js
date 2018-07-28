var socket = io();

socket.on('connect',function(){
    console.log('connected to server');
    var params = jQuery.deparam(window.location.search);
    //adding the room name
    var h1  =  jQuery('<h1></h1>').text(params.room).addClass('roomName');
    jQuery('.chat__sidebar').prepend(h1);

    socket.emit('join', params,function(err){
      if(err){
        alert(err);
        window.location.href='/';
      }else{
        console.log('Инпуты в порядке, миссия выполнена, мойдодыр');
      }
    });

});


socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){

  var ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
console.log('Users list: ',users);
});

// socket.on('userLeft', function(name){
// console.log('User left the chat : ',name);
// });

function scrollToBottom(){
  //Selectors
  var messages=jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  //Heights

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
  // var lastMessageHeight = newMessage.prev().innerHeight();
  console.log('clientHeight:', clientHeight, ' scrollTop: ', scrollTop, ' scrollHeight: ',scrollHeight, ' newMessageHeight: ',newMessageHeight);
  if(clientHeight+scrollTop+newMessageHeight+1>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
};

socket.on('newMessage', function(dataGotten){
  console.log('Got message from server to user: ',dataGotten);

  var formattedTime = moment(dataGotten.createdAt).format('h:mm a');
  var template = jQuery('#message_template').html();
  var html = Mustache.render(template,{
    from:dataGotten.from,
    text: dataGotten.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var formattedTime = moment(dataGotten.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${dataGotten.from} at ${formattedTime}:  ${dataGotten.text}`);
  // jQuery('#messages').append(li);
});


socket.on('newLocationMessage',function(message){
  console.log('A location was sent: ', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var htmlTemplate = jQuery('#location_message_template').html();
  //var htmlTemplate = '{{from}} {{createdAt}} {{url}}'
  var readyUpHTML = Mustache.render(htmlTemplate,{
    from: message.from,
    createdAt: formattedTime,
     url:message.url
  });
  jQuery('#messages').append(readyUpHTML);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">Я сейчас здесь</a>');
  // li.text(`${message.from} : `);
  // a.attr('href', message.url);
  // li.append(a);
  //   var formattedTime = moment(message.createdAt).format('h:mm a');
  // li.append(` - отправлено в ${formattedTime}`);
  // jQuery('#messages').append(li);

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
