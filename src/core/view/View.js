import {decorate} from 'core/util/util';
import {Views} from 'core/view/Views';

function ViewHandlerDescriptor(target, value) {
  Views.views.push({target, value});
}

export function View(arg) {
  return decorate(ViewHandlerDescriptor, arg);
}