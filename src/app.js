'use strict';

const fs = require('fs');
require('./modules/read-file.js');
require('./modules/write-file.js');
require('./modules/uppercase.js');
require('./modules/app-logger.js');
const serverClient = require('./modules/app-server-client.js');
const events = require('./modules/events.js');
const client = require('socket.io-client');

let file = process.argv.slice(2).shift();

// Lifecycle below:
// ... we start the app here
// read ==> (read_done / read_error)
// on read_done ==> uppercase ==> uppercase_done
// on uppercase_done ==> write ==> (write_done / write_error)

events.on('read_done', data => {
  events.emit('uppercase', data);
});
events.on('uppercase_done', data => {
  events.emit('write', data);
});

events.emit('read', file);

serverClient(client);
