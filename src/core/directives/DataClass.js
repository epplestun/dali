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
    let classNames = value.split(',');

    classNames.forEach((className) => {
      let [elementClassName, elementValue] = className.split(':');
      elementClassName = elementClassName.trim().replace(/'/gm, "");

      if(this.evaluator.eval(data, elementValue)) {
        element.classList.add(elementClassName);
      } else {
        element.classList.remove(elementClassName);
      }
    });
  }
}