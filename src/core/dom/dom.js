import {Components} from 'core/component/Components';

export class DOM {
  static walk2(node1, node2, callback) {
    do {
      callback(node1, node2);

      if (!!node1 && node1.hasChildNodes() && !!node2 && node2.hasChildNodes()) {
        DOM.walk2(node1.firstChild, node2.firstChild, callback);
      }
    } while (
      node1 = node1.nextSibling ? node1.nextSibling : node1, 
      node2 = node2.nextSibling ? node2.nextSibling : node2
    );
  }

  static walk(node, callback) {
    do {
      callback(node);

      if (!!node && node.hasChildNodes()) {
        DOM.walk(node.firstChild, callback);
      }
    } while (node = node.nextSibling);
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
  }
}