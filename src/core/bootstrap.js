import {log} from 'core/util/util';
import {Injector} from 'core/di/Injector';
import {Router} from 'core/router/Router';
import {Components} from 'core/component/Components';
import {Binder} from 'core/view/Bindable';

log('bootstrap.js');

export function bootstrap(target) {
  Injector.get(target).run();

  Router.run();
  Components.run();
  Binder.run();
}