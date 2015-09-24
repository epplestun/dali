import {DataDirectives} from 'core/directives/DataDirectives';

export function Directive(value) {
  return function decorator(target) {
    DataDirectives.add(target.name, target, value);
  }
}