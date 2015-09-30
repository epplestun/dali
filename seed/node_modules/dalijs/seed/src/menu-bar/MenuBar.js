import {
  Component,
  View,
  Bindable,
  Runnable,
} from 'dali/dali';

@Component({
  name: 'menu-bar'
})
@View({
  template: '<nav><a *for="link in links" router-link="{{link.path}}" title="{{link.name}}">{{link.name}}</a></nav>'
})
@Runnable
//@Injectable
export class MenuBar {
  @Bindable
  links = [
    { path: '/m1', name: 'Module 1'},
    { path: '/m2', name: 'Module 2'},
    { path: '/m3', name: 'Module 3'}
  ];
}