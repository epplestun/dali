import {HTTP} from 'http/HTTP';

var assert = require('assert'),
    sinon = require('sinon');

require('sinon-as-promised');

class AssertResponse {
  constructor(response) {
    let [code, method, headers, body] = response;

    this.code = code;
    this.method = method;
    this.headers = headers;
    this.body = body;
  }

  toBe200() {
    assert.equal(this.code, 200);
    return this;
  }

  //toBe404() {
  //  assert.equal(this.code, 404);
  //  return this;
  //}

  toBeGET() {
    assert.equal(this.method.toUpperCase(), 'GET');
    return this;
  }

  toBePOST() {
    assert.equal(this.method.toUpperCase(), 'POST');
    return this;
  }

  toBeContentType(type) {
    assert.equal(this.headers['Content-type'], type);
    return this;
  }

  notificate(callback) {
    callback.call(callback);
  }
}


describe('HTTP', () => {
  var getStub, postStub;

  beforeEach(() => {
    let okGetResponse = [
      200, 'GET',
      {
        'Content-type': 'application/json'
      },
      '{"hello":"world"}'
    ],
      okPostResponse = [
        200, 'POST',
        {
          'Content-type': 'application/json'
        },
        '{"hello":"world"}'
      ];

    getStub = sinon.stub(HTTP, 'get').resolves(okGetResponse);
    postStub = sinon.stub(HTTP, 'post').resolves(okPostResponse);
  });

  afterEach(() => {
    getStub.restore();
    postStub.restore();
  });

  it('GET request', (done) => {
    HTTP.get('/hello').then((response) => {
      new AssertResponse(response).toBe200().toBeGET().toBeContentType('application/json').notificate(done);
    });
  });

  it('POST request', (done) => {
    HTTP.post('/hello').then((response) => {
      new AssertResponse(response).toBe200().toBePOST().toBeContentType('application/json').notificate(done);
    });
  });
});