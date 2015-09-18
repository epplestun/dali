import {Render} from 'util/render/Render';

export class DataFor {
	render(data, element, value) {
		let cloneElement = element.cloneNode(true);
		let parentNode = element.parentNode;
		let [iterator, , list, track, by, trackBy] = value.match(/([$a-zA-Z0-9]+)/g);

		//console.log('trackBy', trackBy);

		parentNode.removeChild(element);

		data[list].forEach((item, index) => {
			let contextData = {};
			contextData[iterator] = item;

			let childElement = cloneElement.cloneNode(true);
			childElement.innerHTML = Render.render(
				childElement.innerHTML, 
				contextData
			);

			parentNode.appendChild(childElement);
		});
	}
}