import {Injector} from 'core/di/Injector';
import {Router} from 'core/router/Router';

export function bootstrap(target) {
  Injector.get(target).run();
  Router.run();
}