import {Injector} from '../di/Injector';
import {EventBus} from '../event/EventBus';

function setPrimitive(value) {
  if (!isNaN(value)) {
    // check integer
    if (/[0-9]+/.test(value)) {
      return parseInt(value, 10);
    }

    // check float
    if (/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(value)) {
      return parseFloat(value);
    }
  }

  return value;
}

export class EventBinder {
  static DataCache = {};

  static bindInstance(element, attrs, instance) {
    if (attrs.length > 0) {
      attrs.forEach((attr) => {
        let attrName = attr.name,
          attrValue = attr.value;

        if (attrName.charAt(0) === '_') {
          let eventName = attrName.substring(1);

          element.addEventListener(eventName, () => {
            let data = element.contextData;
            let methodName = attrValue.match(/^(.*)\(/mi)[1];
            let args = attrValue.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
            args = args.length > 0 ? args.split(/,/) : [];
            args = args.map((arg) => setPrimitive(arg));            

            if(!!data) {
              args = args.map(arg => {
                if(!!data.hasOwnProperty(arg)) {
                  arg = data[arg];
                }

                return arg;
              });
            }

            instance[methodName].apply(instance, args);
          }, false);           
        }

        if (attrName === 'data-model') {
          element.addEventListener('input', () => {
            instance[attrValue] = element.value;
          }, false);
        }
      });
    }
  }

  static bind(element, attrs, target) {
    if (attrs.length > 0) {
      let instance = Injector.instances[target.name];      
      EventBinder.bindInstance(element, attrs, instance);
    }
  }
}