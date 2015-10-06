import {
  first, 
  last,
  ucfirst,
  guid
} from '../../../src/core/util/util.js';

var assert = require("assert");

describe('Utils', function() {
  describe('#first()', function () {
    it('should return the first element of array', function () {
      let data = [1, 2, 3];
      assert.equal(1, data::first());
    });
  });

  describe('#last()', function () {
    it('should return the last element of array', function () {
      let data = [1, 2, 3];
      assert.equal(3, data::last());
    });
  });

  describe('#ucfirst()', function () {
    it('should return the first letter capitalized', function () {
      let string = "ivan";

      assert.equal("Ivan", string::ucfirst());
    });
  });

  describe('#guid()', function () {
    it('should return valid guid', function () {
      let uuid = guid();

      assert.equal(
        true, 
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid)
      );
    });
  });
});