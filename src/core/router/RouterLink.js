import {Render} from '../render/Render';
import {Directive} from '../directive/Directive';

@Directive({
  name : 'router-link'
})
export class RouterLink {
  render(element, data, value, config) {
    var property = value.substring(2);
    property = property.substring(0, property.length - 2);

    if(property.indexOf('.') > -1) {
      property = property.substring(0, property.indexOf('.'));
    }

    if(data.hasOwnProperty(property)) {
      element.setAttribute('href', '#' + Render.render(value, data));
      element.removeAttribute(config.name);  
    }
  }
}