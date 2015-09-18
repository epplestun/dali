import {Injector} from 'core/di/Injector';
import {Router} from 'core/router/Router';
import {Components} from 'core/component/Components';
import {Directives} from 'core/directives/Directives';

export function bootstrap(target) {
  Injector.get(target).run();
  Router.run();
  Directives.run();
  Components.run();
}