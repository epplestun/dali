import {Inject} from 'core/di/Inject';
import {Directive} from 'core/directives/Directive';
import {i18nConfig} from 'core/i18n/i18nConfig';
import {i18n} from 'core/i18n/i18n';

@Directive({
  name : 'data-i18n'
})
export class DataI18n {
  render(element, data, value) {
    let i18nLabel = element.dataset.i18n,
        i18nValue = element.dataset.i18nValue;

    if(!!i18nValue) {
      i18nValue = JSON.parse(i18nValue);
    }

    if(!!data && !!value) {
      i18nValue = "LT";
      
      if(value.indexOf('|') > -1) {
        let [v, f] = value.split('|').map((s) => { 
          return s.trim();
        });

        i18nLabel = data[v] ? data[v] : i18nLabel;
        i18nValue = f;
      } else {
        i18nLabel = data[value] ? data[value] : i18nLabel;
      }
    }

    element.appendChild(
      document.createTextNode(i18n.from(i18nLabel, i18nConfig.getConfig()).format(i18nValue))
    );
  }
}