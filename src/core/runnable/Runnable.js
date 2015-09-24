import {log} from 'core/util/util';

log('Runnable.js');

export function Runnable(target) {
  Object.assign(target.prototype, {
    run() {
    }
  });
}