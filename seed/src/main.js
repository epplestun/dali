import {bootstrap, Inject} from 'dali/dali';
import {Service} from 'Service';

@Inject(Service)
class main {
	constructor(service) {
		this.service = service;
	}

	run() {
		console.log('My test app');
		this.service.get();
	}
}

bootstrap(main);