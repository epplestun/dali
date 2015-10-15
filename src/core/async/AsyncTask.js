export class AsyncTask {
  constructor(code) {
    this.code = code;
  }

  execute() {
    var code = "var command = " + this.code.toString() + ";";
    code += "onmessage = function(e) { var result = command.apply(command, e.data.args); postMessage(result); }";

    var args = [].slice.call(arguments);
    var blob = new Blob([code]);
    var worker = new Worker(window.URL.createObjectURL(blob));

    return new Promise((resolve, reject) => {
      worker.addEventListener('message', function(e) {
        resolve(e.data);
      }, false);
      worker.postMessage({
        args
      });
    });
  }
}