import {Injector} from 'core/di/Injector';

function normalizeDirectiveName(name) {
  name = name.charAt(0).toLowerCase() + name.slice(1);
  return name.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

export class DataDirective {
  static data = {};

  static add(name, directive, config) {
    DataDirective.data[normalizeDirectiveName(name)] = {
      instance: Injector.get(directive),
      config
    };
  }

  static get(name) {
    return DataDirective.data[name];
  }
}