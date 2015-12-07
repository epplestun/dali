import {log} from '../util/util';
import {DataFilters} from 'DataFilters';

log('Filter.js');

export function Filter(target) {
  DataFilters.add(target.name, target);
}