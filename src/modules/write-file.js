'use strict';

const fs = require('fs');
const util = require('util');
const writeFilePromise = util.promisify(fs.writeFile);
const events = require('./events');

events.on('write', text => handleUpdate(text));

let file = process.argv.slice(2).shift();


/**
 * Function writes the file from the Buffer of text 
 * @param {string} text
 * @returns {}
 */
async function handleUpdate(text) {
  try {
    await writeFilePromise( file, Buffer.from(text)); 
    events.emit('write_done', text);
  } catch (error) {
    events.emit('write_error', error);
  }
}

module.exports = handleUpdate;