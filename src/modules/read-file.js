'use strict';

const fs = require('fs');
const events = require('./events');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);


events.on('read', file => readTheFile(file));

/**
 * This function uses the fs module to read the file, and then uses an event to make it all uppercase
 * @param {string} file
 * @returns {event}
 */

async function readTheFile(file) {
  try {
    const data = await readFilePromise(file);
    events.emit('read_done', data);
  } catch (error) {
    events.emit('read_error', error);
  }
}

module.exports = readTheFile;