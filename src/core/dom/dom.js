import {HTMLParser, HTMLtoDOM} from 'core/dom/HTMLParser';
import {Components} from 'core/component/Components';

export class DOM {

  static getHTML(node) {
    return node.innerHTML.toString();
  }

  static parse(node) {
    let items = node.getElementsByTagName("*");
    for (let i = 0; i < items.length; i++) {
      let n = items[i];

      let tag = n.tagName.toLowerCase(),
        attrs = [];

      Components.parse(n, tag, attrs);

      //counter++;
    }

    //
    //HTMLParser(DOM.getHTML(node), {
    //  start: function(tag, attrs) {
    //    Components.parse(tag, attrs);
    //  }
    //});
  }
}