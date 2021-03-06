import {first} from '../util/util';
import {Injector} from '../di/Injector';
import {EventBus} from '../event/EventBus';
import {EventNameNormalizer} from '../event/EventNameNormalizer';
import {Views} from '../view/Views';
import {Directive} from './Directive';

@Directive({
  name: 'data-model'
})
export class DataModel {
  render(element, data, value, config, target) {
    let eventName = EventNameNormalizer.normalize(
      target, EventBus.MODEL_CHANGE_DETECTED
    );

    let instance = Injector.instances[target.name];

    var bValue = null;
    Object.defineProperty(instance, value, {
      get: function () {
        return bValue;
      },
      set: function (newValue) {
        bValue = newValue;

        let data = {};
        data[value] = newValue;

        EventBus.publish(eventName, data);
      },
      enumerable: true,
      configurable: true
    });

    instance[value] = element.value;

    EventBus.subscribe(eventName, (e, data) => {
      let key = Object.keys(data)
      ::
      first();
      Views.parseModel(key, target);
    });
  }
}