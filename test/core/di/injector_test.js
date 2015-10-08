import {Inject, Injector} from 'core/di/Injector';

var assert = require("assert");

class Target {}

describe('Injector', () => {

  describe('#hasInstance()', () => {
    it('should be have instance of Target', () => {
      Injector.get(Target);

      assert.equal(Injector.hasInstance(Target.name), true);
    });
  });

  describe('#instantiate()', () => {
    it('should be have run method', () => {
      let instance = Injector.get(Target);

      assert.equal(instance instanceof Target, true);
    });
  });

  describe.skip('#resolve()', () => {
    it('should be have run method', () => {
      //assert.equal(true, false);
    });
  });

  describe.skip('#get()', () => {
    it('should be have run method', () => {
      //assert.equal(true, false);
    });
  });
});