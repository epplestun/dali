export class Injector {
  static instances = {};

  static instantiate(target) {
    var instance;

    if(!!Injector.instances.hasOwnProperty(target.name)) {
      instance = Injector.instances[target.name];
    } else {
      instance = Injector.resolve(target);
      Injector.instances[target.name] = instance;
    }

    return instance;
  }

  static resolve(target) {
    var dependencies = {};
    
    if(!!target.dependencies) {
      dependencies = target.dependencies.map(function(target) {
        return Injector.instantiate(target);
      });
    }
    
    var proto = target.prototype;
    var instance = (Object(proto) === proto) ? Object.create(proto) : {};
    var result = Function.prototype.apply.call(target, instance, dependencies);
    return Object(result) === result ? result : instance;  
  }
  
  static get(target) {
    return Injector.instantiate(target);
  }
}