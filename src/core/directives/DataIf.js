import {Directive} from 'core/directive/Directive';

@Directive({
  name : 'data-if'
})
export class DataIf {
  render(element, data, value) {
    if (!data[value]) {
      element.parentNode.removeChild(element);
    }
  }
}