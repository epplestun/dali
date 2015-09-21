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

      if (!!trackBy) {
        contextData[trackBy] = index;
      }

      let childElement = cloneElement.cloneNode(true);
      let args = childElement.innerHTML.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
      args = args.length > 0 ? args.split(/,/) : [];
      oldArgs = '(' + args.join(',') + ')';
      newArgs = '(' + args.map((item) => Render.START_DELIMITER + item + Render.END_DELIMITER).join(',') + ')';

      childElement.innerHTML = childElement.innerHTML.replace(oldArgs, newArgs);

      childElement.innerHTML = Render.render(
        childElement.innerHTML,
        contextData
      );

      parentNode.appendChild(childElement);
    });
  }
}