import {log} from './util/util';
import {Injector} from './di/Injector';
import {Router} from './router/Router';
import {Components} from './component/Components';
import {Binder} from './view/Bindable';
import {i18n} from './i18n/i18n';
import {EventBus} from './event/EventBus';

log('bootstrap.js');

export function bootstrap(target) {
  EventBus.subscribe(i18n.TRANSLATION_LOADED, () => {
    Injector.get(target).run();
    Router.run();
    Components.run();
    Binder.run();
  });
}