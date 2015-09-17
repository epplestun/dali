import {DOM} from 'core/dom/DOM';
import {Views} from 'core/view/Views';
import {first} from 'core/util/util';

export class Components {
  static components = [];

  static parse(node, name, attrs) {
    let component = Components.components.filter((component) => {
      return component.value.name === name;
    });

    Views.parse(node, component::first(), attrs);
  }

  static run() {
    document.addEventListener("DOMContentLoaded", (event) => {
      DOM.parse(event.target.body);
    });
  }
}