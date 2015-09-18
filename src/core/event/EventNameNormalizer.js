export class EventNameNormalizer {
  static normalize(target, eventName) {
    return target.name.toUpperCase() + '_' + eventName;
  }
} 