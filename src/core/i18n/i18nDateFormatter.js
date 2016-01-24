import {LT} from './date/Time'; // Time
import {LTS} from './date/TimeSeconds'; // TimeSeconds
import {L} from './date/MonthDayYearNumeric'; // MonthDayYearNumeric
import {l} from './date/MonthDayYear2Digit'; // MonthDayYear2Digit
import {LL} from './date/MonthNameDayMonthYear'; // MonthNameDayMonthYear
import {ll} from './date/MonthNameShortDayMonthYear'; // MonthNameShortDayMonthYear
import {LLL} from './date/MonthNameDayMonthYearTime'; // MonthNameDayMonthYearTime
import {lll} from './date/MonthNameShortDayMonthYearTime'; // MonthNameShortDayMonthYearTime
import {LLLL} from './date/DayOfWeekMonthNameDayYearTime'; // DayOfWeekMonthNameDayYearTime
import {llll} from './date/DayOfWeekShortMonthNameShortDayYearTime'; // DayOfWeekShortMonthNameShortDayYearTime

export class i18nDateFormatter {
  static from(format) {
    if (format === 'LT') {
      return new LT();
    }

    if (format === 'LTS') {
      return new LTS();
    }

    if (format === 'L') {
      return new L();
    }

    if (format === 'l') {
      return new l();
    }

    if (format === 'LL') {
      return new LL();
    }

    if (format === 'll') {
      return new ll();
    }

    if (format === 'LLL') {
      return new LLL();
    }

    if (format === 'lll') {
      return new lll();
    }

    if (format === 'LLLL') {
      return new LLLL();
    }

    if (format === 'llll') {
      return new llll();
    }
  }
}