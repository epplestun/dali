import {log} from 'core/util/util';
import {EventBus} from 'core/event/EventBus';
import {Router} from 'core/router/Router';
import {Component} from 'core/component/Component';
import {View} from 'core/view/View';
import {Runnable} from 'core/runnable/Runnable';
import {Injector} from 'core/di/Injector';

log('RouterContent.js');

@Component({
  name: 'router-content'
})
@View({
  template: '<div>Router content</div>'
})
export class RouterContent {
  constructor() {
    EventBus.subscribe(Router.ROUTE_CHANGED, this.change);
  }
  
  change(event, route) {
    Injector.resolve(route.target).run();
  }
}