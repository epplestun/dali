import {Inject} from 'core/di/Inject';
import {Directive} from 'core/directives/Directive';
import {i18nConfig} from 'core/i18n/i18nConfig';
import {i18n} from 'core/i18n/i18n';

@Directive({
  name : 'data-i18n'
})
export class Datai18n {
  render(element) {
    let i18nLabel = element.getAttribute('i18n'),
        i18nValue = element.getAttribute('i18n-value');

    if(!!i18nValue) {
      i18nValue = JSON.parse(i18nValue);
    }

    element.appendChild(
      document.createTextNode(i18n.from(i18nLabel, i18nConfig.getConfig()).format(i18nValue))
    );
    element.removeAttribute('i18n');
    element.removeAttribute('i18n-value');
  }
}