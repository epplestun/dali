export class WorkerMock {
  constructor(code) {
    this.code = code;
  }

  addEventListener(subject, callback) {
    let command = this.code;

    this.callback = (data) => {
      callback({
        data: command.apply(command, data.args)
      });
    };
  }

  postMessage(data) {
    this.callback(data);
  }
}