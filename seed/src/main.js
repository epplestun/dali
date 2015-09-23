import {
  bootstrap,
  Inject,
  Component,
  View,
  Bindable,
  Runnable
} from 'dali/dali';

//import {DataShow} from 'DataShow';
//import {DateFilter} from 'DateFilter';
import {Menu} from 'Menu';
import {Module1} from 'module1/Module1';
import {Module2} from 'module2/Module2';
import {Module3} from 'module3/Module3';

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

@Component({
  name: 'app'
})
@View({
  templateUrl: 'main_view.html'
})
@Runnable
@Inject(Menu, Module1, Module2, Module3)
class App {
}

bootstrap(App);