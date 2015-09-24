import {
  RouterConfig,
  View,
  Runnable
} from 'dali/dali';

@RouterConfig({
  path : '/m3'
})
@View({
  template: '<h1>Module3</h1>'
})
@Runnable
export class Module3 {
  constructor() {
    console.log('Module3');
  }
}