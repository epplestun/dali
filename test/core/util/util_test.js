import {
  first, 
  last,
  ucfirst,
  guid
} from 'core/util/util';

var assert = require("assert");

describe('Utils', () => {
  describe('#first()', () => {
    it('should return the first element of array', () => {
      let data = [1, 2, 3];
      assert.equal(1, data::first());
    });
  });

  describe('#last()', () => {
    it('should return the last element of array', () => {
      let data = [1, 2, 3];
      assert.equal(3, data::last());
    });
  });

  describe('#ucfirst()', () => {
    it('should return the first letter capitalized', () => {
      let string = "ivan";

      assert.equal("Ivan", string::ucfirst());
    });
  });

  describe('#guid()', () => {
    it('should return valid guid', () => {
      let uuid = guid();

      assert.equal(
        true, 
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid)
      );
    });
  });
});