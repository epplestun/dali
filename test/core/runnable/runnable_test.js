import {Runnable} from '../../../src/core/runnable/Runnable.js';

var assert = require("assert");

describe('Runnable', function() {
  describe('#run()', function() {
    it('should be have run method', function () {
      @Runnable
      class Subject {}

      assert.equal(true, !!Subject.prototype.run);
    });
  });
});