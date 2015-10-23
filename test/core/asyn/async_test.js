import {AsyncTask} from 'core/async/AsyncTask';

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised"); 
chai.use(chaiAsPromised);
chai.should();

describe('AsyncTask', () => {
  describe('#execute()', () => {
    it('should execute task in background', () => {
      let task = new AsyncTask((a, b) => {
        return a + b;
      });
    
      return task.execute(2, 2).should.become(4);
    });
  });
});