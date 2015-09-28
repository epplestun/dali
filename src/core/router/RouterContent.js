import {log, guid} from 'core/util/util';
import {EventBus} from 'core/event/EventBus';
import {Router} from 'core/router/Router';
import {Component} from 'core/component/Component';
import {View} from 'core/view/View';
import {Views} from 'core/view/Views';
import {Injector} from 'core/di/Injector';
import {Binder} from 'core/view/Bindable';

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