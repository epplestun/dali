import {Injector} from '../di/Injector';

export class DataDirectives {
  static data = {};

  static normalize(name) {
    name = name.charAt(0).toLowerCase() + name.slice(1);
    return name.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  }

  static add(name, directive, config) {
    DataDirectives.data[DataDirectives.normalize(name)] = {
      target: directive,
      instance: Injector.get(directive),
      config
    };
  }

  static get(name) {
    return DataDirectives.data[name];
  }
}