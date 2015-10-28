import {LT} from 'core/i18n/date/LT';
import {LTS} from 'core/i18n/date/LTS';
import {L} from 'core/i18n/date/L';
import {l} from 'core/i18n/date/l';
import {LL} from 'core/i18n/date/LL';
import {ll} from 'core/i18n/date/ll';
import {LLL} from 'core/i18n/date/LLL';
import {lll} from 'core/i18n/date/lll';
import {LLLL} from 'core/i18n/date/LLLL';
import {llll} from 'core/i18n/date/llll';

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