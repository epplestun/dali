import {first} from 'core/util/util';

export class Views {
  static views = [];

  static parse(component) {
    let view = Views.views.filter((view) => {
      return view.target === component.target;
    });

    console.log(view::first());
  }
}