import {Render} from '../render/Render';
import {Directive} from './Directive';
import {Directives} from './Directives';
import {DOM} from '../dom/dom';

@Directive({
  name: 'data-for'
})
export class DataFor {
  render(element, data, value, config) {
    let originalClone = element.cloneNode(true);
    let parentNode = element.parentNode;
    parentNode.removeChild(element);

    let [iterator, , list, , , trackBy] = value.match(/([$a-zA-Z0-9]+)/g);
    data[list].forEach((item, index) => {
      var contextData = {};
      contextData[iterator] = item;

      if (!!trackBy) {
        contextData[trackBy] = index;
      }

      let child = originalClone.cloneNode(true);
      child.removeAttribute(config.name);

      let childParsed = Directives.parseElement(child, contextData);
      let wrapper = document.createElement('div');
      wrapper.innerHTML = Render.render(childParsed.outerHTML, contextData);

      parentNode.appendChild(wrapper.firstChild);

      DOM.parse(parentNode).walk(parentNode, (element) => {
        if (element.nodeType === 1) {
          if (!element.contextData) {
            element.contextData = contextData;
          }
        }
      });
    });
  }
}