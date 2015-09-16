import {DOM} from 'core/dom/DOM';
import {Views} from 'core/view/Views';
import {first} from 'core/util/util';

export class Components {
  static components = [];

  static parse(name, attrs) {
    console.log('Components.parse', name, attrs);

    let component = Components.components.filter((component) => {
      return component.value.name === name;
    });

    Views.parse(component::first());
  }

  static run() {
    document.addEventListener("DOMContentLoaded", function(event) {
      DOM.parse(event.target.body);
    });
  }
}