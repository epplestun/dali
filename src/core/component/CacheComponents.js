import {log} from 'core/util/util';
import {ucfirst} from 'core/util/util';

log('CacheComponents.js');

export class CacheComponents {
  static data = {};

  static normalize(name) {
    return name.toLowerCase().replace(/\W+(.)/g, function (x, chr) {
      return chr.toUpperCase();
    })::ucfirst();
  }

  static add(name, component, config) {
    CacheComponents.data[name] = {
      target: component,
      config
    };
  }

  static get(name) {
    return CacheComponents.data[name];
  }
}