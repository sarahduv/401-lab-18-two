'use strict';

const io = require('socket.io-client');

let socket = io.connect('http://localhost:3001');

socket.on('broadcast_save_done', data => log('save', data));
socket.on('broadcast_error', data => log('error', data));

/**
 * This function logs our events
 * @param {string} event
 * @param {data} payload
 */
function log(event, payload) {
  let time = new Date();
  if (event === 'save') {
    console.log({event, time, payload});
  } else if (event === 'error') {
    console.error({event, time, payload});
  }
}

exports.log = log;