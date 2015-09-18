import {first} from 'core/util/util';
import {Injector} from 'core/di/Injector';
import {EventBus, EventNameNormalizer} from 'core/event/EventBus';
import {Views} from 'core/view/Views';

export class DataModel {
	render(data, element, value, target) {
		let instance = Injector.instances[target.name];
		let eventName = EventNameNormalizer.normalize(
			target, EventBus.MODEL_CHANGE_DETECTED
		);
		
		Object.defineProperty(instance, value, {
			get: function() { 
				return bValue; 
			},
		  set: function(newValue) { 
		  	bValue = newValue;

		  	let data = {};
		  	data[value] = newValue;

		  	EventBus.publish(eventName, data);
		  },
		  enumerable: true,
		  configurable: true
		});

		instance[value] = element.value;
		
		EventBus.subscribe(eventName, (e, data) => {
			let key = Object.keys(data)::first();

			Views.parseModel(key, data, target);
		});
	}
}