import {log} from '../util/util';
import {DataDirectives} from './DataDirectives';

log('Directive.js');

export function Directive(value) {
  return function decorator(target) {
    DataDirectives.add(target.name, target, value);
  }
}