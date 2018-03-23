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

socket.on('newLocationMessage', function (message) {
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
  $('#messages').animate({ scrollTop: $('#messages').prop("scrollHeight") }, 3000)
});

jQuery('#message-form').on('submit', function (e) {
 e.preventDefault();
 let messageTextbox = $('[name=message]');
 socket.emit('createMessage', {
   from: 'User',
   text: messageTextbox.val()
 }, function () {
   messageTextbox.val('')
 })
});

let locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (pos) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});
