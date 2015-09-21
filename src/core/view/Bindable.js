import {EventBus, EventNameNormalizer} from 'core/event/EventBus';
import {Injector} from 'core/di/Injector';

export function Bindable(target, key) {
  if(target.bindableFields) {
    target.bindableFields.push(key);
  } else {
    target.bindableFields = [key];
  }
}

export class Binder {

  static bindArray(target, key, eventName) {
    //
    // override array methods
    // http://stackoverflow.com/questions/5100376/how-to-watch-for-array-changes
    //

    let methods = ['push', 'pop', 'reverse', 'shift', 'unshift', 'splice'];
    methods.forEach((name) => {
      Object.defineProperty(target[key], name, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function () {
          Array.prototype[name].apply(this, arguments);
          EventBus.publish(eventName);
          return this.length;
        }
      });
    });

    //Binder.bindOther(target, key, eventName);
  }

  static bindOther(target, key, eventName) {
    let value = target[key],
        privateProperty = key + '_' + (+new Date());

    Object.defineProperty(target, privateProperty, {
      enumerable: false,
      configurable: false,
      writable: true
    });

    Object.defineProperty(target, key, {
      set: function(newValue) {
        this[privateProperty] = newValue;
        EventBus.publish(eventName);
      },
      get: function() {
        return this[privateProperty];
      }
    });

    target[key] = value;
  }

  static run() {
    for(var instanceName in Injector.instances) {
      let instance = Injector.instances[instanceName];

      if(!!instance.bindableFields) {
        let target = {
          name : instanceName
        };
        let eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED);

        instance.bindableFields.forEach((key) => {
          if(instance[key] instanceof Array) {
            Binder.bindArray(instance, key, eventName);
          } else {
            Binder.bindOther(instance, key, eventName);  
          }
        });
      }
    }
  }
}