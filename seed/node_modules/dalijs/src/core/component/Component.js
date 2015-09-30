import {log} from 'core/util/util';
import {DataComponents} from 'core/component/DataComponents';

log('Component.js');

export function Component(value) {
  return function decorator(target) {
    DataComponents.add(target.name, target, value);
  }
}