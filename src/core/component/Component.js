import {decorate} from 'core/util/util';

function ComponentHandlerDescriptor(target, value) {
  console.log('ComponentHandlerDescriptor', target, value);
}

export function Component(arg) {
  return decorate(ComponentHandlerDescriptor, arg);
}