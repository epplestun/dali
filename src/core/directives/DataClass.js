import {Inject} from 'core/di/Inject';
import {Directive} from 'core/directives/Directive';
import {Evaluator} from 'core/evaluator/Evaluator';

// TODO

@Directive({
  name: 'data-class'
})
@Inject(Evaluator)
export class DataClass {
  constructor(evaluator) {
    this.evaluator = evaluator;
  }

  render(element, data, value) {
  }
}