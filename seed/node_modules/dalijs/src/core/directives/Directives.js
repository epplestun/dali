import {DataDirectives} from 'core/directives/DataDirectives';
import {Components} from 'core/component/Components';

export class Directives {
  static has(name) {
    return !!DataDirectives.get(name);
  }

  static get(name) {
    return DataDirectives.get(name);
  }

  static getDirectives() {
    return DataDirectives.data;
  }

  static parseElement(element, data) {
    if (!!element.hasAttributes()) {
      let directives = elementAttrs(element)
        .filter((attr) => Directives.has(attr.name))
        .map((attr) => {
          return {
            directive: Directives.get(attr.name),
            value: attr.value
          };
        });

      Directives.render(element, directives, data);
    }

    return element;
  }

  static parse(node, data, target) {
    var childNodes = Array.prototype.slice.call(
      node.getElementsByTagName("*")
    ).filter((element) => element.nodeType === 1);

    childNodes.forEach((element) => {
      if (!!element.hasAttributes()) {
        let directives = elementAttrs(element)
          .filter((attr) => Directives.has(attr.name))
          .map((attr) => {
            return {
              directive: Directives.get(attr.name),
              value: attr.value,
              target
            };
          });

        Directives.render(element, directives, data);
      }
    });

    return node;
  }

  static render(element, directives, data) {
    directives.forEach((input) => {
      let {directive, value, target} = input;

      directive.instance.render(
        element, 
        data, 
        value, 
        directive.config, 
        target
      );
    });
  }
}

Directives.PREFIX = "data-";