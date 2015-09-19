import {
  bootstrap,
  Inject,
  Component,
  View,
  Bindable,
  BindableArray,
  Runnable
} from 'dali/dali';

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

  constructor() {
  }

  add() {
    //this.name = this.name;
    this.todos.push(this.item);

    this.name = this.todos.length;
  }

  remove(item, index) {
    this.todos.splice(index, 1);
    this.name = this.todos.length;
  }

  clean() {
    this.name = "My First App!!";
    this.todos = [];
  }
}

bootstrap(App);