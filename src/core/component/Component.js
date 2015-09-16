import {decorate} from 'core/util/util';
import {Components} from 'core/component/Components';

function ComponentHandlerDescriptor(target, value) {
  Components.components.push({target, value});
}

export function Component(arg) {
  return decorate(ComponentHandlerDescriptor, arg);
}