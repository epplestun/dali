import {Runnable} from 'core/runnable/Runnable';

var assert = require("assert");

describe('Runnable', () => {
  describe('#run()', () => {
    it('should be have run method', () => {
      @Runnable
      class Subject {}

      assert.equal(true, !!Subject.prototype.run);
    });
  });
});