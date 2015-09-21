import {DataDirective} from 'core/directives/DataDirective';

export class Directives {
  static get(name) {
    return DataDirective.get(name);
  }

  static getDirectives() {
    return DataDirective.data;
  }
}

Directives.PREFIX = "data-";