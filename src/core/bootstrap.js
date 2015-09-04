import {Injector} from 'core/di/Injector';

export function bootstrap(target) {
  var injector = new Injector();
  var instance = injector.get(target);
  instance.run();
}