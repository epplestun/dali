import {AsyncTask} from 'core/async/AsyncTask';

var assert = require("assert");

describe.skip('AsyncTask', () => {
  describe('#execute()', () => {
    it('should execute task in background', () => {
      let task = new AsyncTask((a, b) => {
        return a + b;
      });

      task.execute(2, 2).then((result) => {
        //console.log('Result', result);
        assert.equal(result, 4);
      });
    });
  });
});