import {Injector} from '../di/Injector';

function normalizeFilterName(name) {
  return name.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

export class DataFilters {
  static data = {};

  static add(name, filter) {
    DataFilters.data[normalizeFilterName(name)] = Injector.get(filter);
  }

  static get(name) {
    return DataFilters.data[name];
  }
}