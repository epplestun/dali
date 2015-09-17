import {EventBus, EventNameNormalizer} from 'core/event/EventBus';

export function Bindable(target, key, descriptor) {
	let setter = descriptor.set;

	let eventName = EventNameNormalizer.normalize(
    target.constructor, EventBus.CHANGE_DETECTED
  );
		
	descriptor.set = function(value) {
	  setter.call(this, value);
	  EventBus.publish(eventName);
	};	
}