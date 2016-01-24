import {log} from '../util/util';
import {DataComponents} from './DataComponents';

log('Component.js');

export function Component(value) {
  return function decorator(target) {
    DataComponents.add(target.name, target, value);
  }
}