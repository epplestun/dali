import {
  bootstrap,
  Inject,
  Component,
  View,
  Bindable,
  BindableArray,
  Runnable,
} from 'dali/dali';

import {DataShow} from 'DataShow';
import {DateFilter} from 'DateFilter';

@Component({
  name: 'menu'
})
@View({
  template: '<div>Menu {{name}}</div>'
})
@Runnable
class Menu {
  @Bindable
  name = "My First App XXX!!";
}

@Component({
  name: 'app'
})
@View({
  templateUrl: 'main_view.html'
})
@Runnable
class App {

  @Bindable
  name = "My First App!!";

  @Bindable
  todos = [];

  date = new Date();

  add() {
    this.todos.push(this.item);
  }

  remove(item, index) {
    this.todos.splice(index, 1);
  }

  clean() {
    while(this.todos.length > 0) {
      this.todos.splice(0, 1);
    }
  }
}

bootstrap(App);