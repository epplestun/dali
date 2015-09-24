import {DataFilters} from 'core/filters/DataFilters';

export function Filter(target) {
  DataFilters.add(target.name, target);
}