import {
  RouterConfig,
  View
} from 'dali/dali';

@RouterConfig({
  default: true,
  path : '/m1'
})
@View({
  template: '<h1>Module1</h1>'
})
export class Module1 {
  /*
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
  */
}