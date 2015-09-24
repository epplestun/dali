import {first} from 'core/util/util';
import {Injector} from 'core/di/Injector';
import {EventBus, EventNameNormalizer} from 'core/event/EventBus';
import {Views} from 'core/view/Views';
import {Directive} from 'core/directive/Directive';

@Directive({
  name : 'data-model'
})
export class DataModel {
  render(element, data, value, config, target) { 
    let eventName = EventNameNormalizer.normalize(
      target, EventBus.MODEL_CHANGE_DETECTED
    );

    let instance = Injector.instances[target.name];

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
      let key = Object.keys(data)::first();

      console.log(key, data, target);
      //Views.parseModel(key, data, target);
    });
  }
}