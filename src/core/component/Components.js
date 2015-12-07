import {DOM} from '../dom/dom';
import {Views} from '../view/Views';
import {first} from '../util/util';
import {DataComponents} from './DataComponents';

export class Components {
  static components() {
    return DataComponents.data;
  }

  static normalize(element) {
    return DataComponents.normalize(element.nodeName);
  }

  static exists(name) {
    return !!DataComponents.get(name);
  }

  static get(name) {
    return DataComponents.get(name);
  }

  static parse(node, component) {
    Views.parse(node, component);
  }

  static run(element) {
    if(!!element) {
      DOM.parse(element);
    } else {
      document.addEventListener("DOMContentLoaded", (event) => {
        DOM.parse(event.target.body);
      });
    }
  }
}