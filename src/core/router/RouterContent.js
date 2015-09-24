import {log} from 'core/util/util';
import {EventBus} from 'core/event/EventBus';
import {Router} from 'core/router/Router';
import {Component} from 'core/component/Component';
import {View} from 'core/view/View';
import {Views} from 'core/view/Views';
import {Injector} from 'core/di/Injector';

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
        template = Views.views[route.target.name].template,
        target = route.target,
        eventName = EventNameNormalizer.normalize(
          target, EventBus.CHANGE_DETECTED
        ),
        instance = Injector.instantiate(route.target);

    Views.parseComponent(
      element,
      template,
      instance,
      route.target
    );

    EventBus.subscribe(eventName, () => {
      Views.parseComponent(
        element,
        template,
        instance,
        route.target
      );
    });

    Binder.run(instance, target.name);
  }
}