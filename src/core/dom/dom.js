import {Components} from 'core/component/Components';

export class DOM {
  static walk(n, c) {
    do {
      c(n);

      if (!!n && n.hasChildNodes()) {
        DOM.walk(n.firstChild, c);
      }
    } while (n = n.nextSibling);
  }

  static clean(node) {
    for(var n = 0; n < node.childNodes.length; n++) {
      var child = node.childNodes[n];
      if(child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
        node.removeChild(child);
        n--;
      } else if(child.nodeType === 1) {
        DOM.clean(child);
      }
    }
  }

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