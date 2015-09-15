import {RouterConfig} from 'dali/dali';

@RouterConfig({
  path : '/m1'
})
export class M1 {
  constructor() {
    console.log('m1');
  }

  config() {
    //this.log.debug('configuring Login');

    console.log('config m1');
  }

  run() {
    console.log('run m1');
  }
}