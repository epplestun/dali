import {Render} from 'core/render/Render';
import {DOM} from 'core/dom/dom';
import {EventBus} from 'core/event/EventBus';
import {EventNameNormalizer} from 'core/event/EventNameNormalizer';
import {EventBinder} from 'core/event/EventBinder';
import {HTTP} from 'http/HTTP';
import {Injector} from 'core/di/Injector';
import {Directives} from 'core/directives/Directives';

function elementAttrs(element) {
  let nodeAttrs = Array.prototype.slice.call(element.attributes);

  return nodeAttrs.map((attribute) => {
    return {
      name: attribute.name,
      value: attribute.value,
      escaped: attribute.value.replace(/(^|[^\\])"/g, '$1\\\"') //"
    };
  });
}

function sameAttributes(elementAttrs, attrs) {
  return elementAttrs.length === attrs.length && JSON.stringify(elementAttrs) === JSON.stringify(attrs);
}

export class Views {
  static views = {};

  static parseModel(key, target) {
    let view = Views.views[target.name]
        node = view.nodeCached,
        template = view.templateCached,
        instance = Injector.instances[target.name],
        value = instance[key];

    DOM.walk(node, () => {
      DOM.cache.forEach((cacheNode) => {
        let regexp = new RegExp(Render.START_DELIMITER + key + Render.END_DELIMITER, 'gm');

        if(cacheNode.data instanceof Array) {
          cacheNode.data.forEach(attr => {
            if(!!regexp.test(attr.value)) {
              cacheNode.node.setAttribute(attr.name, instance[key]);
            }
          });
        } else {
          if(!!regexp.test(cacheNode.data)) {
            cacheNode.node.nodeValue = instance[key];
          }  
        }
      });
    });
  }

  static parseComponent(node, template, data, target) {    
    let wrapper = document.createElement('div');
    wrapper.innerHTML = Render.normalize(template);

    let nodeParsed = Directives.parse(wrapper, data, target);

    if(!!node) {
      node.innerHTML = nodeParsed.innerHTML;

      DOM.walk(node, (n) => {
        if(n.nodeType === 1 && n.hasAttributes()) {
          DOM.cache.push({
            node: n,
            data: elementAttrs(n).slice()
          }); 
        } else if(n.data) {
          DOM.cache.push({
            node: n,
            data: n.data.slice()
          });

          n.data = Render.render(n.data, data);
        }
      });

      DOM.parse(node).walk(node, (element) => {
        if(element.nodeType === 1) {
          let attrs = !!element.hasAttributes() ? elementAttrs(element) : [];
          EventBinder.bind(element, attrs, target);
        }
      });
    }
  }

  static parseView(node, template, instance, target) {
    let eventName = EventNameNormalizer.normalize(
      target, EventBus.CHANGE_DETECTED
    );

    Views.parseComponent(
      node,
      template,
      instance,
      target
    );

    EventBus.subscribe(eventName, () => {
      Views.parseComponent(
        node,
        template,
        instance,
        target
      );
    });
  }

  static resolve(view, node, target, instance) {
    if (!!view) {
      var promise;

      if (!!view.hasOwnProperty(Views.TEMPLATE_URL)) {
        promise = HTTP.get(view[Views.TEMPLATE_URL]);
      } else if (!!view.hasOwnProperty(Views.TEMPLATE) && !view.hasOwnProperty(Views.TEMPLATE_URL)) {
        promise = Promise.resolve(view[Views.TEMPLATE]);
      } else {
        throw new Exception("View need templateUrl or template attributes");
      }

      promise.then(function (template) {
        view.templateCached = template;
        view.nodeCached = node;
        
        Views.parseView(node, template, instance, target);
      });
    }
  }

  static parse(node, component) {
    if (!!component) {
      let view = Views.views[component.target.name],
          target = component.target,
          instance = Injector.instances[target.name];;

      Views.resolve(view, node, target, instance);
    }
  }
}

Views.TEMPLATE_URL = "templateUrl";
Views.TEMPLATE = "template";