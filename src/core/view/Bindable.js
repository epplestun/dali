import {EventBus, EventNameNormalizer} from 'core/event/EventBus';

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

export function BindableArray(target, key, descriptor) {
  //console.log(target, key, descriptor);
  let eventName = EventNameNormalizer.normalize(
    target.constructor, EventBus.CHANGE_DETECTED
  );

  //console.log(eventName, descriptor.set);

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

   console.log(this, n, eventName);

   //EventBus.publish(eventName);

   return n;
   }
   });
   */
}

export function Bindable(target, key, descriptor) {
  let setter = descriptor.set;
  let eventName = EventNameNormalizer.normalize(
    target.constructor, EventBus.CHANGE_DETECTED
  );

  descriptor.set = function (value) {
    setter.call(this, value);
    EventBus.publish(eventName);
  };
}