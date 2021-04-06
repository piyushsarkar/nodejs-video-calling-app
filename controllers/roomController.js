exports.socket = (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message, userId);
    });

    // disconnect
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });

    // mute-everyone
    socket.on('admincmd', () => {
      console.log('userid', userId);
      io.to(roomId).emit('mute-all');
    });
  });
};


exports.io = (io) => {
  io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit('user-connected', userId);
  
      // messages
      socket.on('message', (message) => {
        //send message to the same room
        io.to(roomId).emit('createMessage', message, userId);
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
} 