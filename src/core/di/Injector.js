export class Injector {  
  resolve(target) {
    var dependencies= [];
    
    if(!!target.dependencies) {
      dependencies = target.dependencies.map(function(target) {
        return this.resolve(target);
      }.bind(this));
    }
    
    var proto = target.prototype;
    var instance = (Object(proto) === proto) ? Object.create(proto) : {};
    var result = Function.prototype.apply.call(target, instance, dependencies);
    return Object(result) === result ? result : instance;  
  }
  
  get(target) {
    return this.resolve(target);
  }
}

export function Inject(...values) {
  return function(target) {
    target.dependencies = values;
  }
};