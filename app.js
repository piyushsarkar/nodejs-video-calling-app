const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');
// const {socket} = require('./controllers/roomController');

// // app.use(cors())

// Passport Config
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

/* 2) ROUTES */
app.use('/', require('./routes/indexRoutes'));
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/roomRoutes'));

// 3) socket events
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId, userName) => {
    if(userName == '') userName = "Guest";
    socket.join(roomId);
    console.log(userName,userId);
    socket.to(roomId).broadcast.emit('user-connected', userId, userName);

    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message, userName);
    });

    // disconnect
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });

    // mute-everyone
    socket.on('mute-everyone', () => {
      console.log('userid', userId);
      io.to(roomId).emit('mute-all');
    });
  });
});

module.exports = server;
