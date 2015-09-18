import {Render} from 'util/render/Render';

export class DataFor {
	render(data, element, value, target) {
		let cloneElement = element.cloneNode(true);
		let parentNode = element.parentNode;
		let [iterator, , list, track, by, trackBy] = value.match(/([$a-zA-Z0-9]+)/g);

		parentNode.removeChild(element);

		data[list].forEach((item, index) => {
			let contextData = {};
			contextData[iterator] = item;

			if(!!trackBy) {
				contextData[trackBy] = index;
			}

			let childElement = cloneElement.cloneNode(true);
			//childElement.setAttribute('for-iterator', iterator);
			//childElement.setAttribute('for-value', item);
			//childElement.setAttribute('for-index', index);

			childElement.innerHTML = Render.render(
				childElement.innerHTML, 
				contextData
			);

			parentNode.appendChild(childElement);
		});
	}
}