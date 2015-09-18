import {decorate} from 'core/util/util';
import {Directives} from 'core/directives/Directives';

export function Directive(target) {

	console.log('Directive', Directives, target.name);
	//Directives.directives[target.name] = target;
}