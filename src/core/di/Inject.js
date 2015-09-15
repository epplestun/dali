import {decorate} from 'core/util/util';

function InjectHandlerDescriptor(target, values) {
  target.dependencies = values;
}

export function Inject(...args) {
  return decorate(InjectHandlerDescriptor, args);
}