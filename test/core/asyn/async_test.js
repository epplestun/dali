import {AsyncTask} from 'core/async/AsyncTask';

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised"); 
chai.use(chaiAsPromised);
chai.should();

/*
// TODO
@Async
class MyTask {
  execute(a, b) {
    return a + b;
  }
}

let task = new MyTask();
task.execute(2, 2).then((data) => {
  console.log(data);
});
*/

describe('AsyncTask', () => {
  describe('#execute()', () => {
    it('should execute task in background', (done) => {
      let task = new AsyncTask((a, b) => {
        return a + b;
      });

      done();

      return task.execute(2, 2).should.become(4);
    });
  });
});