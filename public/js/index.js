let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
 console.log('New message', message);
 let li = jQuery('<li></li>');
 li.text(`${message.from}: ${message.text}`);

 jQuery('#messages').append(li);
 $('#messages').animate({ scrollTop: $('#messages').prop("scrollHeight") }, 3000)
});


// socket.emit('createMessage', {
//   from: 'Test',
//   text: 'Sup!'
// }, function (res) {
//   console.log('Got it', res);
// })

jQuery('#message-form').on('submit', function (e) {
 e.preventDefault();
 socket.emit('createMessage', {
   from: 'User',
   text: jQuery('[name=message]').val()
 }, function () {

 })
});
