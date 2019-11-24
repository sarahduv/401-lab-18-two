'use strict';

const events = require('./events.js');

// observers
[
  'write',
  'write_error',
  'write_done',
  'read',
  'read_error',
  'read_done',
  'uppercase',
  'uppercase_done',
].forEach(name => events.on(name, payload => log(name, payload)));

/**
 * This function logs our events
 * @param {string} event
 * @param {data} payload
 */
function log(event, payload) {
  let time = new Date();
  console.log({event, time, payload});
}

exports.log = log;