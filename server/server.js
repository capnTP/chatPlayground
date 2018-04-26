const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
const CryptoJS = require('crypto-js');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString, isDuplicate } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname , '..', '/public');
let port = process.env.PORT || 5000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
// app.set('view engine', 'hbs');

app.use(express.static(publicPath, {
  extensions: ['html']
}));

// app.get('/chat', (req, res) => {
//   res.render('chat.hbs')
// });

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.on('join', (params, callback) => {
    let user = CryptoJS.AES.decrypt(params.name, params.k).toString(CryptoJS.enc.Utf8);
    let session = CryptoJS.AES.decrypt(params.room, params.k).toString(CryptoJS.enc.Utf8);
    if (isDuplicate({user, session}, users.users)) {
      return callback('Same user is live in this session. Please terminate or join your previous session.');
    }

    socket.join(session);
    users.removeUser(socket.id);
    users.addUser(socket.id, user, session);

    io.to(session).emit('updateUserList', users.getUserList(session));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat Playground'));
    socket.broadcast.to(session).emit('newMessage', generateMessage('Admin', `${user} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user)
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if (user)
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected...');
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room...`));
    }
  });
});

server.listen(port, () => {
  console.log('Server started on port', port);
});
