'use strict';

const port = process.env.PORT || 3001;
const io = require('socket.io')(port);


io.listen(port, () => console.log(`io up on ${port}`) );

let connectedCounter = 0;

io.on('connection', (socket) => {
  connectedCounter++;
  console.log('Got new connection! New count: ', connectedCounter);
  socket.on('save', (data) => onSave(data));
  socket.on('error', (data) => onError(data));
  socket.on('close', () => {
    connectedCounter--;
    console.log('Lose one connection! New count: ', connectedCounter);
  });
});

function onSave(data) {
  io.emit('broadcast_save_done', data);
}

function onError(data) {
  io.emit('broadcast_error', data);
}

