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
    from: 'example@example.com',
    text: 'How r u!',
    createdAt: new Date().toLocaleString()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected...');
  });
});

server.listen(port, () => {
  console.log('Server started on port', port);
});
