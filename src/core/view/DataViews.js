import {log} from 'core/util/util';

log('DataViews.js');

export class DataViews {
  static data = {};

  static normalize(name) {
    return name;
  }

  static add(name, view, config) {
    console.log(name, DataViews.normalize(name));

    DataViews.data[DataViews.normalize(name)] = {
      target: view,
      config
    };
  }

  static get(name) {
    return DataViews.data[name];
  }
}