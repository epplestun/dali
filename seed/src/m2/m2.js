import {RouterConfig} from 'dali/dali';

@RouterConfig({
  path: '/m2'
})
export class M2 {
  constructor() {
    console.log('m2');
  }

  config() {
    //this.log.debug('configuring Login');
    console.log('config m2');
  }

  run() {
    //this.log.debug('running Login');
    console.log('run m2');
  }
}