import {
  bootstrap,
  Inject,
  Component,
  View,
  Bindable,
  Runnable,
  RouterContent
} from 'dali/dali';

import {MenuBar} from 'menu-bar/MenuBar';
import {Module1} from 'module1/Module1';
import {Module2} from 'module2/Module2';
import {Module3} from 'module3/Module3';

@Component({
  name: 'app'
})
@View({
  templateUrl: 'main_view.html'
})
@Runnable
@Inject(RouterContent, MenuBar)
class App {
  @Bindable
  appName = "My Fist DALI App!!";
}

bootstrap(App);