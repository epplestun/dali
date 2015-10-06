import {Inject} from 'core/di/Inject';
import {Evaluator} from 'core/evaluator/Evaluator';
import {Directive} from 'core/directives/Directive';

@Directive({
  name : 'data-if'
})
@Inject(Evaluator)
export class DataIf {
  constructor(evaluator) {
    this.evaluator = evaluator;
  }

  render(element, data, value) {
    //console.log('this.evaluator', this, this.evaluator);
    //if (this.evaluator.eval(data, value)) {

    if(!data[value]) {
      element.parentNode.removeChild(element);
    }
  }
}