import {i18nDate} from './i18nDate';
import {i18nNumber} from './i18nNumber';
import {i18nTranslate} from './i18nTranslate';

export class i18n {
  static configs = null;

  static from(input, config) {
    return new i18n(input, config);
  }

  constructor(input, config) {
    this.input = input;
    this.config = config;
  }

  static getConfig() {
    return i18n.configs;
  }

  static setConfig(key, value) {
    i18n.configs[key] = value;
  }

  isDate(input) {
    return input instanceof Date;
  }

  isNumber(input) {
    return typeof input === 'number';
  }

  isString(input) {
    return typeof input === 'string';
  }

  locale(input) {
    return input.replace('-', '_');
  }

  format(opts) {
    if(!!this.isDate(this.input)) {
      let options = i18nDate.fromFormat(opts, this.config);

      return this.input.toLocaleString(this.config.locale, options);
    }

    if(!!this.isNumber(this.input)) {
      let options = i18nNumber.fromFormat(opts, this.config);

      if(opts === i18nNumber.PERCENT) {
        this.input /= 100;
      }

      return this.input.toLocaleString(this.config.locale, options);
    }

    if(!!this.isString(this.input)) {
      let map = this.config.translations[this.locale(this.config.locale)];
      return i18nTranslate.from(map, this.input).translate(opts);
    }
  }
}

i18n.TRANSLATION_LOADED = 'TRANSLATION_LOADED';