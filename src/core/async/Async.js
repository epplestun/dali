import {decorate, cloneFunc} from '../util/util';
import {WorkerMock} from '../mocks/WorkerMock';

function isNode() {
  return 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
}

function hasWorkerSupport() {
  return (typeof window.Worker !== 'undefined' && typeof window.Blob !== 'undefined') && (typeof window.URL.createObjectURL == 'function')
}

export function Async(target) {
  let execute = cloneFunc(target.prototype.execute);

  Object.assign(target.prototype, {
    execute() {
      var args = [].slice.call(arguments);
      var worker;

      if (isNode()) {
        worker = new WorkerMock(execute);
      } else {
        if (hasWorkerSupport()) {
          var code = "var command = " + execute.toString() + ";";
          code += "onmessage = function(e) { var result = command.apply(command, e.data.args); postMessage(result); self.close(); }";

          worker = new Worker(window.URL.createObjectURL(new Blob([code])));
        } else {
          throw new Error('Do not support workers');
        }
      }

      return new Promise((resolve) => {
        worker.addEventListener('message', (e) => {
          resolve(e.data);
        }, false);
        worker.postMessage({
          args
        });
      });
    }
  });
}