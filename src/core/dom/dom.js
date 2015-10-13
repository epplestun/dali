import {Components} from 'core/component/Components';

export class DOM {

  static cache = [];

  static attrs(node) {
    if(!!node) {
      let nodeAttrs = Array.prototype.slice.call(node.attributes);

      return nodeAttrs.map((attribute) => {
        return {
          name: attribute.name,
          value: attribute.value,
          escaped: attribute.value.replace(/(^|[^\\])"/g, '$1\\\"')
        };
      });
    }
  }

  static walk(node, callback) {
    if(!!node) {
      do {
        callback(node);

        if (!!node && node.hasChildNodes()) {
          DOM.walk(node.firstChild, callback);
        }
      } while (node = node.nextSibling);
    }

    return DOM;
  }

  static clean(node) {
    if(!!node) {
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

    return DOM;
  }

  static childs(node) {
    let childNodes = [];

    if(!!node) {
      DOM.walk(node, function(n) {
        childNodes.push(n);
      });
      childNodes.shift();
    }

    return childNodes;
  }

  static parse(node) {
    if(!!node) {
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
            
            let attrs = !!element.hasAttributes() ? DOM.attrs(element) : [];
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

    return DOM;
  }

  static fragment(node) {
    let fragment = document.createDocumentFragment();
    
    if(!!node) {
      while(node.firstChild) {
        fragment.appendChild(node.firstChild);
      }
    }

    return fragment;
  }
}