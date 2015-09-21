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
  //get name() { return this._name; }
  //set name(value) { this._name = value; }
  name = "My First App!!";

  @Bindable
  todos = [];

  constructor() {
    this.name = "My First App!!";
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
    //this.todos = [];
  }
}

bootstrap(App);