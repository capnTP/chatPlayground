let socket = io();

// let scrollToBottom = () => {
//   // selectors - messages view
//   let messages = $('#messages');
//   let newMessage = messages.children('li:last-child');
//   // height variables
//   let clientHeight = messages.prop('clientHeight');
//   let scrollTop = messages.prop('scrollTop');
//   let scrollHeight = messages.prop('scrollHeight');
//   let newMessageHeight = newMessage.innerHeight();
//   let lastMessageHeight = newMessage.prev().innerHeight();
//
//   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
//     messages.scrollTop(scrollHeight);
//   }
// };

socket.on('connect', function () {
  let params = $.deparam(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      bootbox.alert({
        message: err,
        backdrop: true,
        callback: () => {
          window.location.href = '/';
        }
      })
    } else {
      console.log('Successful joining!');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  let ol = $('<ol></ol>');

  users.forEach((user) => {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
})

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm A');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  $('#messages').animate({ scrollTop: $('#messages').prop("scrollHeight") }, 1000);
  // scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm A');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  $('#messages').animate({ scrollTop: $('#messages').prop("scrollHeight") }, 1000);
  // scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
 e.preventDefault();
 let messageTextbox = $('[name=message]');

 if (messageTextbox.val().trim().length > 0) {
   socket.emit('createMessage', {
     text: messageTextbox.val()
   }, function () {
     messageTextbox.val('')
   })
 }
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
