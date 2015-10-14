import {Target} from './Target';

var assert = require("assert");

describe('Runnable', () => {
  describe('#run()', () => {
    it('should be have run method', () => {
      assert.equal(true, !!Target.prototype.run);
    });
  });
});