import {Components} from 'core/component/Components';

export class DOM {
  static parse(node) {
    var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter((element) => element.nodeType === 1);
    
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    childNodes.forEach((element) => {
      let componentName = Components.normalize(element);

      if(!!Components.exists(componentName)) {
        if(!!Injector.hasInstance(componentName)) {
          if(element.parentNode) {
            element.parentNode.appendChild(element);
          } else {
            node.appendChild(element);
          }
          
          let attrs = !!element.hasAttributes() ? elementAttrs(element) : [];
          Components.parse(element, attrs, Components.get(componentName));
        } else {
          throw new Error('Error, no instance for component: ' + componentName);
        }
      } else {
        if(element.parentNode) {
          element.parentNode.appendChild(element);
        } else {
          node.appendChild(element);
        }
      }
    });
  }
}