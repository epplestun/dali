import {merge} from '../util/util';
import {i18nDateFormatter} from './i18nDateFormatter';

export class i18nDate {

  /**
   * Formats
   *
   * LT   -> 8:30 PM
   * LTS  -> 8:30:25 PM
   * L    -> 09/04/1986
   * l    -> 9/4/1986
   * LL   -> September 4 1986
   * ll   -> Sep 4 1986
   * LLL  -> September 4 1986 8:30 PM
   * lll  -> Sep 4 1986 8:30 PM
   * LLLL -> Thursday, September 4 1986 8:30 PM
   * llll -> Thu, Sep 4 1986 8:30 PM
   */

  static fromFormat(format, config) {
    let options = {};

    if (!!config['timezone']) {
      options.timeZone = config['timezone'];
    }

    options.hour12 = !!options.hour12;

    if (!!format) {
      return i18nDate.createFromFormat(format, options);
    }

    return options;
  }

  static createFromFormat(format, options) {
    let outputOptions = JSON.parse(JSON.stringify(options));
    let dateOptions = i18nDateFormatter.from(format).getOptions();

    return merge(outputOptions, dateOptions);
  }
}