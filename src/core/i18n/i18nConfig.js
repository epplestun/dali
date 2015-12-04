import {decorate} from 'core/util/util';
import {i18n} from 'core/i18n/i18n';
import {HTTP} from 'http/HTTP';

function i18nConfigHandlerDescriptor(target, value) {
  if(value.hasOwnProperty('loader')) {
    let locale = value.locale.replace('-', '_');

    HTTP.get(value.loader).then((translations) => {
      value.translations = {};
      value.translations[locale] = translations;

      i18n.configs = value;
    });
  } else {
    i18n.configs = value;
  }
}

export function i18nConfig(arg) {
  return decorate(i18nConfigHandlerDescriptor, arg);
}