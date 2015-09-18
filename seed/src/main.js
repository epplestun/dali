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
  //template: '<div>My template example</div>'
  templateUrl : 'main_view.html',
  bindable: true
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
    this.name = this.name + "";
    this.todos.push(this.item);
  }

  remove(item) {
    console.log('remove', item);
  }

  clean() {
    this.name = this.name + "";
    this.todos = [];
  }
}

bootstrap(App);