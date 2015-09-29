import {Render} from 'core/render/Render';
import {Directive, Directives} from 'core/directive/Directive';
import {guid} from 'core/util/util';

@Directive({
  name : 'data-for'
})
export class DataFor {
  render(element, data, value, config, target) {
    let originalClone = element.cloneNode(true);
    let parentNode = element.parentNode;
    parentNode.removeChild(element);

    let [iterator, , list, track, by, trackBy] = value.match(/([$a-zA-Z0-9]+)/g);
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
        if(element.nodeType === 1) {
          if(!element.dataset.hasContext) {
            element.dataset.hasContext = true;
            element.dataset.uuid = guid();

            EventBinder.DataCache[element.dataset.uuid] = contextData;
          }
        }
      });
    });
  }
}