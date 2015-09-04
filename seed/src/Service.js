import {Inject, HTTP} from 'dali/dali';

@Inject(HTTP)
export class Service {
	constructor(http) {
		this.http = http;
	}

	get() {
		this.http.get();
	}
}