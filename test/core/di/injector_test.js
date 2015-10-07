import {Inject, Injector} from 'core/di/Injector';

var assert = require("assert");

class Target {}

describe.skip('Injector', () => {

  let instance = Injector.get(Target);

  describe('#hasInstance()', () => {
    it('should be have instance of Target', () => {
      assert.equal(Injector.hasInstance(Target), true);
    });
  });

  describe('#instantiate()', () => {
    it('should be have run method', () => {
      //assert.equal(true, false);
    });
  });

  describe('#resolve()', () => {
    it('should be have run method', () => {
      //assert.equal(true, false);
    });
  });

  describe('#get()', () => {
    it('should be have run method', () => {
      //assert.equal(true, false);
    });
  });
});