import {HTTP} from 'http/HTTP';

var assert = require('assert'),
    sinon = require('sinon');

require('sinon-as-promised');

var assertResponse = (code, type) => {
  assert.equal(code, 200);
  assert.equal(type, 'application/json');

  return (response, callback) => {
    callback.call(callback);
  };
};

var assertRequest = (response, done) => {
  console.log(response);
  done();
};

describe('HTTP', () => {
  beforeEach(() => {
    var okResponse = [
      200,
      { 'Content-type': 'application/json' },
      '{"hello":"world"}'
    ];

    sinon.stub(HTTP, 'get').resolves(okResponse);
  });

  it('GET request', (done) => {
    //server.respondWith('GET', '/hello', okResponse);

    HTTP.get('/hello').then((response) => {
      assertResponse(200, 'application/json')(response, done);
    });
  });
});
