import {log} from 'core/util/util';
import {DataFilters} from 'core/filters/DataFilters';

log('Filter.js');

export function Filter(target) {
  DataFilters.add(target.name, target);
}