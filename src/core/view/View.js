import {decorate} from 'core/util/util';

function ViewHandlerDescriptor(target, value) {
  console.log('ViewHandlerDescriptor', target, value);
  //target.view = value;
}

export function View(arg) {
  return decorate(ViewHandlerDescriptor, arg);
}