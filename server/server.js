const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');

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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat Playground'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().toLocaleString()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().toLocaleString()
    })
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().toLocaleString()
    // })
  });

  socket.on('disconnect', () => {
    console.log('User disconnected...');
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'One user has left the room...',
      createdAt: new Date().toLocaleString()
    })
  });
});

server.listen(port, () => {
  console.log('Server started on port', port);
});
