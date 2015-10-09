import {Components} from 'core/component/Components';

export class DOM {

  static cache = [];

  static walk(node, callback) {
    do {
      callback(node);

      if (!!node && node.hasChildNodes()) {
        DOM.walk(node.firstChild, callback);
      }
    } while (node = node.nextSibling);

    return DOM;
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

    return DOM;
  }

  static childs(node) {
    let childNodes = [];
    DOM.walk(node, function(n) {
      childNodes.push(n);
    });
    childNodes.shift();

    return childNodes;
  }

  static parse(node) {
    let childNodes = DOM.childs(node);

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

    return DOM;
  }

  static fragment(node) {
    let fragment = document.createDocumentFragment();
    
    while(node.firstChild) {
      fragment.appendChild(node.firstChild);
    }

    return fragment;
  }
}