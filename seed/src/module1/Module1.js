import {
  RouterConfig,
  View,
  Runnable
} from 'dali/dali';

import {DateFilter} from 'filters/DateFilter';

@RouterConfig({
  default: true,
  path : '/m1'
})
@View({
  template: '<h2>Module1 {{name}}</h2><div><ul><li *for="todo in todos">{{todo | dateFilter}}</li></ul><button _click="add()">Add</button><button _click="clean()">Clear</button></div>'
})
@Runnable
export class Module1 {  
  @Bindable
  name = "My First App!!";

  @Bindable
  todos = [];

  date = new Date();

  add() {
    //this.todos.push(this.item);
    this.todos.push(new Date());
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