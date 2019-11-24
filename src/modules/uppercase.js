'use strict';

const events = require('./events');

events.on('uppercase', data => handleUpperCase(data));

/**
 * Function turns data into a string, and then to uppercase
 * @param {data} - data
 * @returns {event} - emits the revised text
 */
function handleUpperCase(data) {
  let text = data.toString().toUpperCase();
  events.emit('uppercase_done', text);
}


module.exports = handleUpperCase;