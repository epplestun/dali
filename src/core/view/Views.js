import {first} from 'core/util/util';
import {Render} from 'core/render/Render';
import {HTMLParser} from 'core/dom/HTMLParser';
import {EventBus, EventNameNormalizer, EventBinder} from 'core/event/EventBus';
import {Injector} from 'core/di/Injector';

export class Views {
  static views = {};

  static parseAll(node, template, data, target) {
    function sameAttributes(nodeAttrs, attrs) {
      nodeAttrs = nodeAttrs.map((attribute) => {
        return {
          name: attribute.name,
          value: attribute.value,
          escaped: attribute.value.replace(/(^|[^\\])"/g, '$1\\\"') //"
        };
      });

      return nodeAttrs.length === attrs.length && JSON.stringify(nodeAttrs) === JSON.stringify(attrs);
    }

    node.innerHTML = Render.render(
      template, 
      data
    );    

    var childNodes = Array.prototype.slice.call(node.childNodes).filter((element) => element.nodeType === 1);
    
    HTMLParser(node.innerHTML, {
      start: (tag, attrs, unary) => {                
        var childNode = childNodes.filter((element) => {
          var nodeAttrs = element.hasAttributes() ? 
            Array.prototype.slice.call(element.attributes) : 
            [];

          return element.nodeName.toLowerCase() === tag.toLowerCase() 
            && sameAttributes(nodeAttrs, attrs);
        });

        EventBinder.bind(childNode::first(), attrs, target);
      }
    });
  }

  static parse(node, component, attrs) {
    if(!!component) {
      let view = Views.views[component.target.name];

      if(!!view) {
        let target = component.target,
            {template, bindable} = view,
            eventName = EventNameNormalizer.normalize(
              target, EventBus.CHANGE_DETECTED
            ),
            instance = Injector.instances[target.name];

        Views.parseAll(
          node, 
          template, 
          instance, 
          target
        );

        if(!!bindable) {
          EventBus.subscribe(eventName, () => {
            Views.parseAll(
              node, 
              template, 
              instance, 
              target
            );
          });  
        }
      }
    }
  }
}