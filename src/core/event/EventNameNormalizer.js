export class EventNameNormalizer {
  static normalize(target, eventName) {
    if (!!target && !!target.name) {
      return target.name.toUpperCase() + '_' + eventName;
    }
  }
}