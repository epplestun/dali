import {
  RouterConfig,
  View,
  Runnable
} from 'dali/dali';

@RouterConfig({
  path : '/m3'
})
@View({
  template: '<h2>Module3</h2>'
})
@Runnable
export class Module3 {
}