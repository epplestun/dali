export class Evaluator {
  eval(data, code) {
    let args = Object.keys(data),
      values = args.map(function (value) {
        return data[value];
      });

    let executor = new Function(args, 'return ' + code);
    return executor.apply(executor, values);
  }
}