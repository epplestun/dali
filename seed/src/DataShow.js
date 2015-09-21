import {
  Directive,
  Inject,
  Evaluator
} from 'dali/dali';

@Directive({
  name: 'data-show'
})
@Inject(Evaluator)
class DataShow {
  constructor(evaluator) {
    this.evaluator = evaluator;
  }

  render(data, element, value) {
    element.style.display = this.evaluator.eval(data, value) ? 'block' : 'none';
  }
}