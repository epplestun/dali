import {
  Component,
  View,
  Bindable,
  Runnable,
} from 'dali/dali';

@Component({
  name: 'menu'
})
@View({
  template: '<nav>{{counter}}<button _click="click()">Click me!</button><a *for="link in links" router-link="{{link.path}}" title="{{link.name}}">{{link.name}} <strong>ss</strong></a>'
})
@Runnable
//@Injectable
export class Menu {
  @Bindable
  links = [
    { path: '/m1', name: 'Module 1'},
    { path: '/m2', name: 'Module 2'},
    { path: '/m3', name: 'Module 3'}
  ];

  @Bindable
  counter = 0;

  click() {
    this.counter++;
    console.log('click!');
  }
}