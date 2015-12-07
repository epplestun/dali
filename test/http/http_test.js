import {HTTP} from '../../src/http/HTTP';
import {AssertResponse} from './AssertResponse';

var assert = require('assert'),
    sinon = require('sinon');

require('sinon-as-promised');

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