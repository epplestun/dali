var assert = require('assert');

export class AssertResponse {
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