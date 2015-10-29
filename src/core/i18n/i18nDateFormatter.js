import {LT} from 'core/i18n/date/Time'; // Time
import {LTS} from 'core/i18n/date/TimeSeconds'; // TimeSeconds
import {L} from 'core/i18n/date/MonthDayYearNumeric'; // MonthDayYearNumeric
import {l} from 'core/i18n/date/MonthDayYear2Digit'; // MonthDayYear2Digit
import {LL} from 'core/i18n/date/MonthNameDayMonthYear'; // MonthNameDayMonthYear
import {ll} from 'core/i18n/date/MonthNameShortDayMonthYear'; // MonthNameShortDayMonthYear
import {LLL} from 'core/i18n/date/MonthNameDayMonthYearTime'; // MonthNameDayMonthYearTime
import {lll} from 'core/i18n/date/MonthNameShortDayMonthYearTime'; // MonthNameShortDayMonthYearTime
import {LLLL} from 'core/i18n/date/DayOfWeekMonthNameDayYearTime'; // DayOfWeekMonthNameDayYearTime
import {llll} from 'core/i18n/date/DayOfWeekShortMonthNameShortDayYearTime'; // DayOfWeekShortMonthNameShortDayYearTime

export class i18nDateFormatter {
  static from(format) {
    if(format === 'LT') {
      return new LT();  
    }    

    if(format === 'LTS') {
      return new LTS();  
    }

    if(format === 'L') {
      return new L();  
    }

    if(format === 'l') {
      return new l();  
    }

    if(format === 'LL') {
      return new LL();  
    }

    if(format === 'll') {
      return new ll();  
    } 

    if(format === 'LLL') {
      return new LLL();  
    }

    if(format === 'lll') {
      return new lll();  
    }   

    if(format === 'LLLL') {
      return new LLLL();  
    }

    if(format === 'llll') {
      return new llll();  
    }   
  }
}