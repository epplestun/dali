import {first} from 'core/util/util';
import {Render} from 'core/render/Render';
import {HTMLParser} from 'core/dom/HTMLParser';
import {EventBus, EventNameNormalizer, EventBinder} from 'core/event/EventBus';
import {HTTP} from 'http/HTTP';
import {Inject, Injector} from 'core/di/Injector';
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

  static parseModel(key, data, target) {
    let view = Views.views[target.name]
        node = view.nodeCached,
        template = view.templateCached;

    let wrapper = document.createElement('div');
    wrapper.innerHTML = Render.normalize(template);

    var wrapperChildNodes = Array.prototype.slice.call(wrapper.getElementsByTagName("*")).filter((element) => element.nodeType === 1);

    wrapperChildNodes = wrapperChildNodes.filter((element) => {
      let regexp = new RegExp('{{' + key + '}}');
      return regexp.test(element.innerText);
    });

    wrapperChildNodes.forEach((wrapperChildNode) => {
      let attrs = elementAttrs(wrapperChildNode);

      var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter((element) => element.nodeType === 1);
      let childNode = childNodes.filter((element) => {
        let nodeAttrs = !!element.hasAttributes() ? elementAttrs(element) : [];
        return element.nodeName.toLowerCase() === wrapperChildNode.nodeName.toLowerCase() && sameAttributes(nodeAttrs, attrs);     
      });

      childNode.forEach((cn) => {
        cn.innerHTML = Render.render(
          wrapperChildNode.innerHTML, 
          data
        );
      });
    });
  }

  static parseAll(node, template, data, target) {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = Render.normalize(template);

    var wrapperChildNodes = Array.prototype.slice.call(
      wrapper.getElementsByTagName("*")
    ).filter((element) => element.nodeType === 1);

    wrapperChildNodes.forEach((element) => {
      if(!!element.hasAttributes()) {
        let attrs = elementAttrs(element);

        attrs.forEach(attr => {
          let directive = Directives.get(attr.name);

          if(!!directive) {
            directive.render(data, element, attr.value, target);
          }          
        });
      }
    });

    node.innerHTML = Render.render(
      wrapper.innerHTML, 
      data
    );

    var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter((element) => element.nodeType === 1);
    
    childNodes.forEach((cn) => {
      let attrs = !!cn.hasAttributes() ? elementAttrs(cn) : [];
      EventBinder.bind(cn, attrs, target);
    });
  }

  static parse(node, component) {
    if(!!component) {
      let view = Views.views[component.target.name];

      if(!!view) {
        var promise;

        if(!!view.hasOwnProperty(Views.TEMPLATE_URL)) {
          promise = HTTP.get(view[Views.TEMPLATE_URL]);
        } else if(!!view.hasOwnProperty(Views.TEMPLATE) && !view.hasOwnProperty(Views.TEMPLATE_URL)) {
          promise = Promise.resolve(view[Views.TEMPLATE]);
        } else {
          throw new Exception("View need templateUrl or template attributes");
        }

        promise.then(function(template) {
          view.templateCached = template;
          view.nodeCached = node;

          let target = component.target,
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

          EventBus.subscribe(eventName, () => {
            Views.parseAll(
              node,
              template,
              instance,
              target
            );
          });
        });
      }
    }
  }
}

Views.TEMPLATE_URL = "templateUrl";
Views.TEMPLATE = "template";