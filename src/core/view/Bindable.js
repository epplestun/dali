import {EventBus, EventNameNormalizer} from 'core/event/EventBus';
import {Injector} from 'core/di/Injector';

/*
 Object.defineProperty(Array.prototype, "push", {
 configurable: false,
 enumerable: false, // hide from for...in
 writable: false,
 value: function () {

 for (var i = 0, n = this.length, l = arguments.length; i < l; i++, n++) {
 this[n] = arguments[i];
 //console.log(this, n, this[n] = arguments[i]); // assign/raise your event
 }

 console.log(this, n);

 //EventBus.publish(eventName);

 return n;
 }
 });
 */

/*
 var observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
 console.log(mutation);
 });
 });

 var config = { attributes: true, childList: true, characterData: true };

 // pass in the target node, as well as the observer options
 observer.observe(target, config);
 */


export function Bindable(target, key) {
  if(target.bindableFields) {
    target.bindableFields.push(key);
  } else {
    target.bindableFields = [key];
  }
  /*
  let setter = descriptor.set;
  let eventName = EventNameNormalizer.normalize(
    target.constructor, EventBus.CHANGE_DETECTED
  );

  descriptor.set = function (value) {
    setter.call(this, value);
    EventBus.publish(eventName);
  };
  */
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