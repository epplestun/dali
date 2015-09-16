import {first} from 'core/util/util';
import {Render} from 'core/render/Render';
import {HTMLtoDOM} from 'core/dom/HTMLtoDOM';

export class Views {
  static views = [];

  static parse(node, component) {
    if(!!component) {
      let view = Views.views.filter((view) => {
        return view.target === component.target;
      });

      view = view::first();

      if(!!view) {
        let {template} = view.value;

        let nodes = Render.getDOM(HTMLtoDOM(Render.render(template, {})));

        console.log(nodes);

        node.parentNode.replaceChild(nodes::first(), node);
      }
    }
  }
}