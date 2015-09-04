import {Injector} from 'core/di/Injector';

export function bootstrap(target) {
  console.log('Bootstrap');
  console.log(target);

  var injector = new Injector();
  var instance = injector.get(target);
  instance.run();
};