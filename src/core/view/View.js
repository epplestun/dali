import {decorate} from 'core/util/util';
import {Views} from 'core/view/Views';

function ViewHandlerDescriptor(target, value) {
	Views.views[target.name] = value;
}

export function View(viewConfig) {
  return decorate(ViewHandlerDescriptor, viewConfig);
}