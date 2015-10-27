export class i18nDate {
  static fromFormat(format, config) {
    let options = {};     

    if(!!config.timezone) {
      options.timeZone = config.timezone;
    }

    if(!!options.hour12) {
      options.hour12 = true;
    } else {
      options.hour12 = false;
    }
      

    return options;
  }
}