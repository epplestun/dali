import {log, decorate} from 'core/util/util';

log('Inject.js');

function InjectHandlerDescriptor(target, values) {
  target.dependencies = values;
}

export function Inject(...args) {
  return decorate(InjectHandlerDescriptor, args);
}