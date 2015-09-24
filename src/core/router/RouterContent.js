import {log} from 'core/util/util';
import {EventBus} from 'core/event/EventBus';
import {Router} from 'core/router/Router';
import {Component} from 'core/component/Component';
import {View} from 'core/view/View';
import {Views} from 'core/view/Views';
import {Injector} from 'core/di/Injector';
import {Binder} from 'core/view/Bindable';

log('RouterContent.js');

@Component({
  name: 'router-content'
})
@View({
  template: '<div id="router-content">Router content</div>'
})
export class RouterContent {
  constructor() {
    EventBus.subscribe(Router.ROUTE_CHANGED, this.change);
  }
  
  change(event, route) {
    let element = document.getElementById('router-content'),
        view = Views.views[route.target.name],
        target = route.target,
        instance = Injector.instantiate(route.target);

    Views.resolve(view, element, target, instance);

    Binder.run(instance, target.name);
  }
}