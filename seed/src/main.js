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