import {DataIf} from 'core/directives/DataIf';
import {DataFor} from 'core/directives/DataFor';
import {DataModel} from 'core/directives/DataModel';

function normalizeDirectiveName(name) {
  name = name.charAt(0).toLowerCase() + name.slice(1);
  return name.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

export function denormalizeDirectiveName(name) {
  name = name.charAt(0).toLowerCase() + name.slice(1);
  return name.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

export class Directives {
  static directives = {};

  static add(name, directive) {
    Directives.directives[normalizeDirectiveName(name)] = directive;
  }

  static get(name) {
    return Directives.directives[name];
  }

  static run() {
    let directives = [
      {name: DataIf.name, directive: Injector.get(DataIf)},
      {name: DataFor.name, directive: Injector.get(DataFor)},
      {name: DataModel.name, directive: Injector.get(DataModel)}
    ];

    directives.forEach(item => {
      let {name, directive} = item;
      Directives.add(name, directive);
    });
  }
}

Directives.PREFIX = "data-";