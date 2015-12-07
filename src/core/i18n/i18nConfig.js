import {decorate} from '../util/util';
import {i18n} from './i18n';
import {HTTP} from '../../http/HTTP';
import {EventBus} from '../event/EventBus';

function i18nConfigHandlerDescriptor(target, value) {
  if (value.hasOwnProperty('loader')) {
    let locale = value.locale.replace('-', '_');

    HTTP.get(value.loader).then((translations) => {
      value.translations = {};
      value.translations[locale] = typeof translations === 'object' ? translations : JSON.parse(translations);

      i18n.configs = value;
      EventBus.publish(i18n.TRANSLATION_LOADED);
    });
  } else {
    i18n.configs = value;
    EventBus.publish(i18n.TRANSLATION_LOADED);
  }
}

export function i18nConfig(arg) {
  return decorate(i18nConfigHandlerDescriptor, arg);
}