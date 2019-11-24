'use strict';



const events = require('./events.js');

function connectToServer(io) {
  let socket = io.connect('http://localhost:3001');

  events.on('read_error', (data) => {
    socket.emit('error', data);
    socket.disconnect();
  });
  events.on('write_error', (data) => {
    socket.emit('error', data);
    socket.disconnect();
  });
  events.on('write_done', (data) => {
    console.log('before', socket);
    socket.emit('save', data);
    socket.disconnect();
    console.log('after', socket);
  });
}

module.exports = connectToServer;