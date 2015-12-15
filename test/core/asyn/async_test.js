import {Async} from '../../../src/core/async/Async';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();

describe('Async', () => {
  @Async class MyTask {
    execute(a, b) {
      return a + b;
    }
  }

  it('should execute task in background using @Async decorator', (done) => {
    let task = new MyTask();
    task.execute(2, 2).should.become(4).notify(done);
  });
});
