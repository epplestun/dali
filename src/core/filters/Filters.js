import {DataFilters} from 'core/filters/DataFilters';

export class Filters {
  static get(name) {
    return DataFilters.get(name);
  }

  static getFilters() {
    return DataFilters.data;
  }
}