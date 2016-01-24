import {ucfirst} from '../util/util';

export class DataComponents {
  static data = {};

  static normalize(name) {
    return name.toLowerCase().replace(/\W+(.)/g, function (x, chr) {
      return chr.toUpperCase();
    })
  ::
    ucfirst();
  }

  static add(name, component, config) {
    DataComponents.data[name] = {
      target: component,
      config
    };
  }

  static get(name) {
    return DataComponents.data[name];
  }
}