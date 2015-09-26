import {log} from 'core/util/util';

export function I18N(value) {
  return function(target) {
    log(value, target);
  }
}