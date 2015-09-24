import {DataComponents} from 'core/component/DataComponents';

export function Component(value) {
  return function decorator(target) {
    DataComponents.add(target.name, target, value);
  }
}