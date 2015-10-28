import {i18nDate} from 'core/i18n/i18nDate';
import {i18nNumber} from 'core/i18n/i18nNumber';
import {i18nTranslate} from 'core/i18n/i18nTranslate';

export class i18n {  
  static from(input, config) {
    /*
    if(!isNaN(Date.parse(input))) {
      input = Date.parse(input);
    }

    if(!isNaN(input)) {
      input = JSON.parse(input);
    }
    */
    
    return new i18n(input, config);
  }

  constructor(input, config) {
    this.input = input;
    this.config = config;
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


/*
@i18n({
  locale: 'es_ES',
  timezone: 'Europe/Madrid',
  currency: 'EUR'
})
export class Target {
  @Bindable
  title = "app.title";

  @Bindable
  date = new Date();

  @Bindable
  number = 100034;
}

style: decimal | currency
if currency set currency property   
*/

/*
<p i18n="title"></p>
<p i18n="date | format:'LT'"></p>
<p>{{date|format:'LT'}}</p>
<p i18n="number"></p>
*/