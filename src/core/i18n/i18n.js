import {i18nDate} from 'core/i18n/i18nDate';
import {i18nNumber} from 'core/i18n/i18nNumber';
import {i18nTranslate} from 'core/i18n/i18nTranslate';

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
      let formatter = opts;
      let options = i18nDate.fromFormat(formatter, this.config);

      return this.input.toLocaleString(this.config.locale, options);
    }

    if(!!this.isNumber(this.input)) {
      let formatter = opts;
      let options = i18nNumber.fromFormat(formatter, this.config);

      if(formatter === i18nNumber.PERCENT) {
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