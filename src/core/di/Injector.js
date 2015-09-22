export class Injector {
  static instances = {};

  static hasInstance(name) {
    return !!Injector.instances.hasOwnProperty(name);
  }

  static instantiate(target) {
    let instance;

    if (!!Injector.hasInstance(target.name)) {
      instance = Injector.instances[target.name];
    } else {
      instance = Injector.resolve(target);
      Injector.instances[target.name] = instance;
    }

    return instance;
  }

  static resolve(target) {
    let dependencies = {};

    if (!!target.dependencies) {
      dependencies = target.dependencies.map(function (target) {
        return Injector.instantiate(target);
      });
    }

    let proto = target.prototype;
    let instance = (Object(proto) === proto) ? Object.create(proto) : {};
    let result = Function.prototype.apply.call(target, instance, dependencies);
    return Object(result) === result ? result : instance;
  }

  static get(target) {
    return Injector.instantiate(target);
  }
}