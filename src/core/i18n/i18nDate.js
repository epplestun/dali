export class i18nDate {
  static fromFormat(format, config) {
    let options = {};     

    if(!!config.timezone) {
      options.timeZone = config.timezone;
    }

    return options;
  }
}