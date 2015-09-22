import {
  Component,
  View,
  Bindable,
  Runnable,
} from 'dali/dali';

@Component({
  name: 'menu'
})
@View({
  template: '<div>Menu {{name}}</div>'
})
@Runnable
//@Injectable
class Menu {
  @Bindable
  name = [1, 2, 3];
}