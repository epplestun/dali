import {Inject} from 'core/di/Inject';
import {Directive} from 'core/directives/Directive';
import {Evaluator} from 'core/evaluator/Evaluator';

@Directive({
  name : 'data-if'
})
@Inject(Evaluator)
export class DataIf {
  constructor(evaluator) {
    this.evaluator = evaluator;
  }

  render(element, data, value) {
    if(!this.evaluator.eval(data, value)) {
      element.parentNode.removeChild(element);
    }
  }
}