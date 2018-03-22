const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname , '..', '/public');
let port = process.env.PORT || 5000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.set('view engine', 'hbs');
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//   res.render('index')
// });

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat Playground'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('Response from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('User disconnected...');
    socket.broadcast.emit('newMessage', generateMessage(
      'Admin',
      'One user has left the room...')
    )
  });
});

server.listen(port, () => {
  console.log('Server started on port', port);
});
