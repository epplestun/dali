import {
  RouterConfig,
  View,
  Runnable
} from 'dali/dali';

@RouterConfig({
  path : '/m2'
})
@View({
  template: '<h2>Module2</h2>'
})
@Runnable
export class Module2 {
}