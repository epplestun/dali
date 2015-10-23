
import {WorkerMock} from 'core/mocks/WorkerMock';

export class AsyncTask {
  constructor(code) {
    this.code = code;
  }

  isNode() {
    return 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
  }

  hasWorkerSupport() {
    return (typeof window.Worker !== 'undefined' && typeof window.Blob !== 'undefined') && (typeof window.URL.createObjectURL == 'function')
  }

  execute() {    
    var args = [].slice.call(arguments);
    var worker;

    if(this.isNode()) {
      worker = new WorkerMock(this.code);
    } else {
      if(this.hasWorkerSupport()) {
        var code = "var command = " + this.code.toString() + ";";
        code += "onmessage = function(e) { var result = command.apply(command, e.data.args); postMessage(result); self.close(); }";

        worker = new Worker(window.URL.createObjectURL(new Blob([code])));
      } else {
        throw new Error('Do not support workers');
      }      
    }

    return new Promise((resolve, reject) => {
      worker.addEventListener('message', (e) => {
        resolve(e.data);
      }, false);
      worker.postMessage({
        args
      });
    });
  }
}