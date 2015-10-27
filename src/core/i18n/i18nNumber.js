export class i18nNumber {
  static fromFormat(format, config) {
    let options = {
      style: i18nNumber.DECIMAL
    };

    if(format === i18nNumber.CURRENCY) {
      options.style = i18nNumber.CURRENCY;
      options.currency = config.currency;
    }

    if(format === i18nNumber.PERCENT) {
      options.style = i18nNumber.PERCENT;      
    }

    return options;
  }
}
i18nNumber.DECIMAL = 'decimal';
i18nNumber.PERCENT = 'percent';
i18nNumber.CURRENCY = 'currency';