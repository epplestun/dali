import {log} from '../util/util';
import {decorate} from '../util/util';
import {Views} from './Views';

log('View.js');

function ViewHandlerDescriptor(target, value) {
  Views.views[target.name] = value;
}

export function View(viewConfig) {
  return decorate(ViewHandlerDescriptor, viewConfig);
}