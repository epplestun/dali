import {Inject} from '../di/Inject';
import {Directive} from './Directive';

@Directive({
  name: 'data-style'
})
export class DataStyle {
  render(element, data, value) {
    let styles = value.split(',');

    styles.forEach((style) => {
      let [elementStyle, elementValue] = style.split(':');
      elementStyle = elementStyle.trim().replace(/'/gm, "");

      element.style[elementStyle.trim()] = data[elementValue.trim()];
    });
  }
}