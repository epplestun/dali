import {Components} from 'core/component/Components';

export class DOM {

  static getHTML(node) {
    return node.innerHTML.toString();
  }

  static parse(node) {
    let items = node.getElementsByTagName("*");

    for (let i = 0; i < items.length; i++) {
      let element = items[i];

      let tag = element.tagName.toLowerCase(),
        attrs = Array.prototype.slice.call(element.attributes);

      Components.parse(element, tag, attrs);
    }
  }
}