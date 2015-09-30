export class Evaluator {
  eval(data, code) {
    var context = data;
    return eval('context.' + code);
  }
}