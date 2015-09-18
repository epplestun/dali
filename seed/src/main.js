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
  name : 'app'
})
@View({
  templateUrl : 'main_view.html'
})
@Runnable
class App { 

  @Bindable
  get name() { return this._name; }
  set name(name) { this._name = name; }

  @BindableArray
  get todos() { return this._todos; }
  set todos(todos) { this._todos = todos; }

  constructor() {
    this.name = "My first App!";
    this.todos = [];
  } 
  
  add() {
    this.name = this.name;
    this.todos.push(this.item);
  }

  remove(item, index) {
    this.name = this.name;
    this.todos.splice(index, 1);
  }

  clean() {
    this.name = this.name;
    this.todos = [];
  }
}

bootstrap(App);