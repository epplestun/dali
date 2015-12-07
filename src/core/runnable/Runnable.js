import {log} from '../util/util';

log('Runnable.js');

export function Runnable(target) {
  Object.assign(target.prototype, {
    run() {
    }
  });
}