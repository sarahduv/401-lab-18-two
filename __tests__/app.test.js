'use strict';

const fs = require('fs');
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;
const events = require('../src/modules/events.js');
require('../src/modules/read-file.js');
require('../src/modules/write-file.js');
require('../src/modules/uppercase.js');
const serverClient = require('../src/modules/app-server-client.js');

// const mockedSocket = {
//   emit_calls: [],
//   emit(name, payload) { this.emit_calls.push({name, payload}); },
//   disconnect() {},
// };
const mockedClient = {
  connect() { return this; },
  emit_calls: [],
  emit(name, payload) { this.emit_calls.push({name, payload}); },
  disconnect() {},
};

serverClient(mockedClient);


jest.mock('fs');

describe('Event application tests', () => {

  beforeEach(async () => {
    mockedClient.emit_calls = [];
  });

  it('can broadcast save', async () => {
    await events.emit('write_done', 'SUCCESS');
    expect(mockedClient.emit_calls.length).toBe(1);
    expect(mockedClient.emit_calls[0].payload).toEqual('SUCCESS');
  });

  it('can broadcast error', async () => {
    await events.emit('read_error', 'failed!');
    expect(mockedClient.emit_calls.length).toBe(1);
    expect(mockedClient.emit_calls[0].payload).toEqual('failed!');
  });

  it('can log a file', () => {
    const spy = sinon.spy();
    const emitter = new EventEmitter();
    emitter.on('read_done', spy);
    emitter.emit('read_done');
    expect(spy.called).toBe(true);
  });

  it('can read a file', (done) => {
    events.on('read_done', (data) => {
      expect(data.toString()).toEqual('helloworld');
      done();
    });
    events.emit('read', './hello');    
  });

  it('can do the uppercase thang', (done) => {
    events.on('uppercase_done', (data) => {
      expect(data).toEqual('LOWERCASE');
      done();
    });
    events.emit('uppercase', 'lowercase');      
  });

  it('can do the write a file thang', (done) => {
    events.on('write_done', () => {
      // expecting write done to be called
      done();    
    });
    events.emit('write', './path');      
  });
});