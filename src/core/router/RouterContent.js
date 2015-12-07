import {log, guid} from '../util/util';
import {EventBus} from '../event/EventBus';
import {Router} from './Router';
import {Component} from '../component/Component';
import {View} from '../view/View';
import {Views} from '../view/Views';
import {Injector} from '../di/Injector';
import {Binder} from '../view/Bindable';

log('RouterContent.js');

const ROUTER_CONTENT_UUID = guid();

@Component({
  name: 'router-content'
})
@View({
  template: '<div id="' + ROUTER_CONTENT_UUID + '"></div>'
})
export class RouterContent {
  constructor() {
    EventBus.subscribe(Router.ROUTE_CHANGED, this.change);
  }
  
  change(event, route) {

    console.log('RouterContent.change', event);

    if(!!route.value.hasOwnProperty('title')) {
      document.title = route.value.title;
    }

    let element = document.getElementById(ROUTER_CONTENT_UUID),
        view = Views.views[route.target.name],
        target = route.target,
        instance = Injector.instantiate(route.target);

    Views.resolve(view, element, target, instance);

    Binder.run(instance, target.name);
  }
}