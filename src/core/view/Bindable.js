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

  static bindArray(target, eventName) {
    //
    // override array methods
    // http://stackoverflow.com/questions/5100376/how-to-watch-for-array-changes
    //

    let methods = ['push', 'pop', 'reverse', 'shift', 'unshift', 'splice'];
    methods.forEach((name) => {
      Object.defineProperty(target, name, {
        configurable: false,
        enumerable: false, // hide from for...in
        writable: false,
        value: function () {
          Array.prototype[name].apply(this, arguments);
          EventBus.publish(eventName);
          return this.length;
        }
      });
    });
  }

  static bindOther(target, eventName) {
    Object.defineProperty(target, {
      get: function() {
        return bValue;
      },
      set: function(newValue) {
        bValue = newValue;
        EventBus.publish(eventName);
      }
    });
  }

  static run() {
    for(var instanceName in Injector.instances) {
      let instance = Injector.instances[instanceName];

      if(!!instance.bindableFields) {
        instance.bindableFields.forEach((key) => {
          let target = {
            name : instanceName
          };
          let eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED);

          if(instance[key] instanceof Array) {
            Binder.bindArray(instance[key], eventName);
          } else {
            if(instance[key] instanceof Array) {
              Binder.bindOther(instance[key], eventName);
            }
          }
        });
      }
    }
  }
}