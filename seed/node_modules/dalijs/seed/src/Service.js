import {Inject, HTTP} from 'dali/dali';

@Inject(HTTP)
export class Service {
  constructor(http) {
    this.http = http;
  }

  get() {
    this.http.get('data.json').then(function (data) {
      console.log(data);
    }, function (error) {
      console.log('error', error);
    });
  }
}