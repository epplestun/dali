import {HTMLParser} from 'core/dom/HTMLParser';
import {Components} from 'core/component/Components';

export class DOM {
  static parse(node) {
    HTMLParser(node.innerHTML.toString(), {
      start: function(tag, attrs) {
        Components.parse(tag, attrs);
      }
    });
  }
}