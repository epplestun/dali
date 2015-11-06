import {Inject} from 'core/di/Inject';
import {Directive} from 'core/directives/Directive';
import {Evaluator} from 'core/evaluator/Evaluator';

// TODO

@Directive({
  name : 'data-style'
})
@Inject(Evaluator)
export class DataStyle {
  constructor(evaluator) {
    this.evaluator = evaluator;
  }

  render(element, data, value) {
  }
}