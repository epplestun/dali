import {decorate} from 'core/util/util';
import {DataDirective} from 'core/directives/DataDirective';

export function Directive(value) {
  return function decorator(target) {
    DataDirective.add(target.name, target, value);
  }
}