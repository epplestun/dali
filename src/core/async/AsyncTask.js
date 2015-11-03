import {decorate} from 'core/util/util';
import {WorkerMock} from 'core/mocks/WorkerMock';

function isNode() {
  return 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
}

function hasWorkerSupport() {
  return (typeof window.Worker !== 'undefined' && typeof window.Blob !== 'undefined') && (typeof window.URL.createObjectURL == 'function')
}

function cloneFunc( func ) {
  var reFn = /^function\s*([^\s(]*)\s*\(([^)]*)\)[^{]*\{([^]*)\}$/gi
    , s = func.toString().replace(/^\s|\s$/g, '')
    , m = reFn.exec(s);
  if (!m || !m.length) return;
  var conf = {
    name : m[1] || '',
    args : m[2].replace(/\s+/g,'').split(','),
    body : m[3] || ''
  }
  var clone = Function.prototype.constructor.apply(this, [].concat(conf.args, conf.body));
  return clone;
}

export function Async(target) {
  let execute = cloneFunc(target.prototype.execute);

  Object.assign(target.prototype, {
    execute() {
      var args = [].slice.call(arguments);
      var worker;

      if(isNode()) {
        worker = new WorkerMock(execute);
      } else {
        if(hasWorkerSupport()) {
          var code = "var command = " + execute.toString() + ";";
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
  });
}

/*
export class AsyncTask {
  constructor(code) {
    this.code = code;
  }

  execute() {    
    var args = [].slice.call(arguments);
    var worker;

    if(isNode()) {
      worker = new WorkerMock(this.code);
    } else {
      if(hasWorkerSupport()) {
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
*/