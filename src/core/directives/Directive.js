import {log} from 'core/util/util';
import {DataDirectives} from 'core/directives/DataDirectives';

log('Directive.js');

export function Directive(value) {
  return function decorator(target) {
    DataDirectives.add(target.name, target, value);
  }
}