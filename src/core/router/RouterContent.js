import {EventBus} from 'core/event/EventBus';
import {Router} from 'core/router/Router';

import {Component} from 'core/component/Component';
import {View} from 'core/view/View';
import {Runnable} from 'core/runnable/Runnable';

/*
@Component({
  name: 'router-content'
})
@View({
  template: '<div>Router content</div>'
})
@Runnable
*/
export class RouterContent {

  constructor() {
    EventBus.subscribe(Router.ROUTE_CHANGED, this.change);
  }

  change(event, route) {
    console.log('RouterContent.change', route);
  }
}