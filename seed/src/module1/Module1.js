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
  templateUrl: 'module1/module1_view.html'
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