import {Evaluator} from '../../../src/core/evaluator/Evaluator.js';

var assert = require("assert"),
    evaluator = new Evaluator();

describe('Evaluator', function() {
  describe('#eval()', function () {
    it('should return true if 10 is less than 5', function () {
      let context = {
        x: 10,
        y: 5
      };

      assert.equal(true, evaluator.eval(context, 'x > y'));
    });

    it('should return false if 10 is greather than 5', function () {
      let context = {
        x: 10,
        y: 5
      };

      assert.equal(false, evaluator.eval(context, 'x < y'));
    });

    it('should return true if x is not null', function () {
      let context = {
        x: 10
      };

      assert.equal(true, evaluator.eval(context, '!!x'));
    });

    it('should return false if x is null', function () {
      let context = {
        x: null
      };

      assert.equal(false, evaluator.eval(context, '!!x'));
    });
  });
});