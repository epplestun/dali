import {Injector} from 'core/di/Injector';

export class EventBinder {
	static bind(element, attrs, target) {
		if(attrs.length > 0) {
			let instance = Injector.instances[target.name];
			
			attrs.forEach((attr) => {
				let attrName = attr.name,
						attrValue = attr.value;

				if(attrName.charAt(0) === '_') {
					let eventName = attrName.substring(1);

					element.addEventListener(eventName, (e) => {
						var [,methodName] = attrValue.match(/(\w+)\((.*?)\)/)
						instance[methodName](e);
					}, false);
				}
				
				if(attrName === 'data-model') {
					element.addEventListener('input', (e) => {						
						instance[attrValue] = element.value;
					}, false);
				}
			});
		}
	}
}