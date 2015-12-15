import {Target} from './Target';
import assert from 'assert';

describe('Runnable', () => {
  describe('#run()', () => {
    it('should be have run method', () => {
      assert.equal(true, !!Target.prototype.run);
    });
  });
});