import {log} from 'core/util/util';
import {Injector} from 'core/di/Injector';
import {Router} from 'core/router/Router';
import {Components} from 'core/component/Components';
import {Binder} from 'core/view/Bindable';
import {i18n} from 'core/i18n/i18n';
import {EventBus} from 'core/event/EventBus';

log('bootstrap.js');

export function bootstrap(target) {
  EventBus.subscribe(i18n.TRANSLATION_LOADED, () => {
    Injector.get(target).run();
    Router.run();
    Components.run();
    Binder.run();
  });
}