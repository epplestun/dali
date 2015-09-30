import {DOM} from 'core/dom/dom';
import {Views} from 'core/view/Views';
import {first} from 'core/util/util';
import {DataComponents} from 'core/component/DataComponents';

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

  static parse(node, attrs, component) {
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