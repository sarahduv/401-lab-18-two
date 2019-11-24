'use strict';

const EE = require('events');

const events = new EE();

// the below is what the events library is doing
// const map = {};

// const magicalEvents = {
//   on: function(name, callback) {
//     if (name in map) {
//       map[name].push(callback);
//     } else {
//       map[name] = [callback];
//     }
//   },
//   emit: function(name, data) {
//     if (name in map) {
//       for (const callback of map[name]) {
//         callback(data);
//       }
//     }
//   },
// };

module.exports = events;