if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(nextSource);
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

export function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  const keys = ['value', 'get', 'set'];

  for (let i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

export function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function () {
      return handleDescriptor(...arguments, entryArgs);
    };
  }
}

export function first() {
  return this[0];
}

export function last() {
  return this[this.length - 1];
}

export function ucfirst() {
  var f = this.charAt(0).toUpperCase();
  return f + this.substr(1);
}

export function log() {
  //console.log(arguments);
}

export function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }

  return _p8() + _p8(true) + _p8(true) + _p8();
}

export function merge(obj1, obj2) {
  return Object.assign(obj1, obj2);
}

export function cloneFunc( func ) {
  var reFn = /^function\s*([^\s(]*)\s*\(([^)]*)\)[^{]*\{([^]*)\}$/gi
    , s = func.toString().replace(/^\s|\s$/g, '')
    , m = reFn.exec(s);
  if (!m || !m.length) return;
  var conf = {
    name : m[1] || '',
    args : m[2].replace(/\s+/g,'').split(','),
    body : m[3] || ''
  }
  var clone = Function.prototype.constructor.apply(this, [].concat(conf.args, conf.body));
  return clone;
}

log('util.js');