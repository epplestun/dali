import {
  RouterConfig,
  View,
  Runnable
} from 'dali/dali';

@RouterConfig({
  path : '/m2'
})
@View({
  template: '<h1>Module2</h1>'
})
@Runnable
export class Module2 {
  constructor() {
    console.log('Module2');
  }
}