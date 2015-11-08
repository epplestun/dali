import {decorate} from 'core/util/util';
import {i18n} from 'core/i18n/i18n';

function i18nConfigHandlerDescriptor(target, value) {
  i18n.configs = value;
}

export function i18nConfig(arg) {
  return decorate(i18nConfigHandlerDescriptor, arg);
}