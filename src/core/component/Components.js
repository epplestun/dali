import {DOM} from 'core/dom/dom';
import {Views} from 'core/view/Views';
import {first} from 'core/util/util';

export class Components {
  static components = [];

  static normalize(element) {
    return element.nodeName.toLowerCase();
  }

  static exists(name) {
    return Components.components.filter((component) => {
      return component.value.name === name;
    }).length > 0;
  }

  static get(name) {
    let component = Components.components.filter((component) => {
      return component.value.name === name;
    });

    return component::first();
  }

  static parse(node, attrs, component) {
    Views.parse(node, component);
  }

  static run() {
    document.addEventListener("DOMContentLoaded", (event) => {
      DOM.parse(event.target.body);
    });
  }
}