"format global";
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopExportWildcard = function (obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj["default"];
    return newObj;
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

(function(global) {

  var defined = {};

  // indexOf polyfill for IE8
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  var getOwnPropertyDescriptor = true;
  try {
    Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
  }
  catch(e) {
    getOwnPropertyDescriptor = false;
  }

  var defineProperty;
  (function () {
    try {
      if (!!Object.defineProperty({}, 'a', {}))
        defineProperty = Object.defineProperty;
    }
    catch (e) {
      defineProperty = function(obj, prop, opt) {
        try {
          obj[prop] = opt.value || opt.get.call(obj);
        }
        catch(e) {}
      }
    }
  })();

  function register(name, deps, declare) {
    if (arguments.length === 4)
      return registerDynamic.apply(this, arguments);
    doRegister(name, {
      declarative: true,
      deps: deps,
      declare: declare
    });
  }

  function registerDynamic(name, deps, executingRequire, execute) {
    doRegister(name, {
      declarative: false,
      deps: deps,
      executingRequire: executingRequire,
      execute: execute
    });
  }

  function doRegister(name, entry) {
    entry.name = name;

    // we never overwrite an existing define
    if (!(name in defined))
      defined[name] = entry;

    // we have to normalize dependencies
    // (assume dependencies are normalized for now)
    // entry.normalizedDeps = entry.deps.map(normalize);
    entry.normalizedDeps = entry.deps;
  }


  function buildGroups(entry, groups) {
    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
      return;

    groups[entry.groupIndex].push(entry);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];

      // not in the registry means already linked / ES6
      if (!depEntry || depEntry.evaluated)
        continue;

      // now we know the entry is in our unlinked linkage group
      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

      // the group index of an entry is always the maximum
      if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {

        // if already in a group, remove from the old group
        if (depEntry.groupIndex !== undefined) {
          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

          // if the old group is empty, then we have a mixed depndency cycle
          if (groups[depEntry.groupIndex].length == 0)
            throw new TypeError("Mixed dependency cycle detected");
        }

        depEntry.groupIndex = depGroupIndex;
      }

      buildGroups(depEntry, groups);
    }
  }

  function link(name) {
    var startEntry = defined[name];

    startEntry.groupIndex = 0;

    var groups = [];

    buildGroups(startEntry, groups);

    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
    for (var i = groups.length - 1; i >= 0; i--) {
      var group = groups[i];
      for (var j = 0; j < group.length; j++) {
        var entry = group[j];

        // link each group
        if (curGroupDeclarative)
          linkDeclarativeModule(entry);
        else
          linkDynamicModule(entry);
      }
      curGroupDeclarative = !curGroupDeclarative; 
    }
  }

  // module binding records
  var moduleRecords = {};
  function getOrCreateModuleRecord(name) {
    return moduleRecords[name] || (moduleRecords[name] = {
      name: name,
      dependencies: [],
      exports: {}, // start from an empty module and extend
      importers: []
    })
  }

  function linkDeclarativeModule(entry) {
    // only link if already not already started linking (stops at circular)
    if (entry.module)
      return;

    var module = entry.module = getOrCreateModuleRecord(entry.name);
    var exports = entry.module.exports;

    var declaration = entry.declare.call(global, function(name, value) {
      module.locked = true;
      exports[name] = value;

      for (var i = 0, l = module.importers.length; i < l; i++) {
        var importerModule = module.importers[i];
        if (!importerModule.locked) {
          for (var j = 0; j < importerModule.dependencies.length; ++j) {
            if (importerModule.dependencies[j] === module) {
              importerModule.setters[j](exports);
            }
          }
        }
      }

      module.locked = false;
      return value;
    });

    module.setters = declaration.setters;
    module.execute = declaration.execute;

    // now link all the module dependencies
    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      var depEntry = defined[depName];
      var depModule = moduleRecords[depName];

      // work out how to set depExports based on scenarios...
      var depExports;

      if (depModule) {
        depExports = depModule.exports;
      }
      else if (depEntry && !depEntry.declarative) {
        depExports = depEntry.esModule;
      }
      // in the module registry
      else if (!depEntry) {
        depExports = load(depName);
      }
      // we have an entry -> link
      else {
        linkDeclarativeModule(depEntry);
        depModule = depEntry.module;
        depExports = depModule.exports;
      }

      // only declarative modules have dynamic bindings
      if (depModule && depModule.importers) {
        depModule.importers.push(module);
        module.dependencies.push(depModule);
      }
      else
        module.dependencies.push(null);

      // run the setter for this dependency
      if (module.setters[i])
        module.setters[i](depExports);
    }
  }

  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
  function getModule(name) {
    var exports;
    var entry = defined[name];

    if (!entry) {
      exports = load(name);
      if (!exports)
        throw new Error("Unable to load dependency " + name + ".");
    }

    else {
      if (entry.declarative)
        ensureEvaluated(name, []);

      else if (!entry.evaluated)
        linkDynamicModule(entry);

      exports = entry.module.exports;
    }

    if ((!entry || entry.declarative) && exports && exports.__useDefault)
      return exports['default'];

    return exports;
  }

  function linkDynamicModule(entry) {
    if (entry.module)
      return;

    var exports = {};

    var module = entry.module = { exports: exports, id: entry.name };

    // AMD requires execute the tree first
    if (!entry.executingRequire) {
      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
        var depName = entry.normalizedDeps[i];
        var depEntry = defined[depName];
        if (depEntry)
          linkDynamicModule(depEntry);
      }
    }

    // now execute
    entry.evaluated = true;
    var output = entry.execute.call(global, function(name) {
      for (var i = 0, l = entry.deps.length; i < l; i++) {
        if (entry.deps[i] != name)
          continue;
        return getModule(entry.normalizedDeps[i]);
      }
      throw new TypeError('Module ' + name + ' not declared as a dependency.');
    }, exports, module);

    if (output)
      module.exports = output;

    // create the esModule object, which allows ES6 named imports of dynamics
    exports = module.exports;
 
    if (exports && exports.__esModule) {
      entry.esModule = exports;
    }
    else {
      entry.esModule = {};
      
      // don't trigger getters/setters in environments that support them
      if (typeof exports == 'object' || typeof exports == 'function') {
        if (getOwnPropertyDescriptor) {
          var d;
          for (var p in exports)
            if (d = Object.getOwnPropertyDescriptor(exports, p))
              defineProperty(entry.esModule, p, d);
        }
        else {
          var hasOwnProperty = exports && exports.hasOwnProperty;
          for (var p in exports) {
            if (!hasOwnProperty || exports.hasOwnProperty(p))
              entry.esModule[p] = exports[p];
          }
         }
       }
      entry.esModule['default'] = exports;
      defineProperty(entry.esModule, '__useDefault', {
        value: true
      });
    }
  }

  /*
   * Given a module, and the list of modules for this current branch,
   *  ensure that each of the dependencies of this module is evaluated
   *  (unless one is a circular dependency already in the list of seen
   *  modules, in which case we execute it)
   *
   * Then we evaluate the module itself depth-first left to right 
   * execution to match ES6 modules
   */
  function ensureEvaluated(moduleName, seen) {
    var entry = defined[moduleName];

    // if already seen, that means it's an already-evaluated non circular dependency
    if (!entry || entry.evaluated || !entry.declarative)
      return;

    // this only applies to declarative modules which late-execute

    seen.push(moduleName);

    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
      var depName = entry.normalizedDeps[i];
      if (indexOf.call(seen, depName) == -1) {
        if (!defined[depName])
          load(depName);
        else
          ensureEvaluated(depName, seen);
      }
    }

    if (entry.evaluated)
      return;

    entry.evaluated = true;
    entry.module.execute.call(global);
  }

  // magical execution function
  var modules = {};
  function load(name) {
    if (modules[name])
      return modules[name];

    var entry = defined[name];

    // first we check if this module has already been defined in the registry
    if (!entry)
      throw "Module " + name + " not present.";

    // recursively ensure that the module and all its 
    // dependencies are linked (with dependency group handling)
    link(name);

    // now handle dependency execution in correct order
    ensureEvaluated(name, []);

    // remove from the registry
    defined[name] = undefined;

    // exported modules get __esModule defined for interop
    if (entry.declarative)
      defineProperty(entry.module.exports, '__esModule', { value: true });

    // return the defined module object
    return modules[name] = entry.declarative ? entry.module.exports : entry.esModule;
  };

  return function(mains, depNames, declare) {
    return function(formatDetect) {
      formatDetect(function(deps) {
        var System = {
          _nodeRequire: typeof require != 'undefined' && require.resolve && typeof process != 'undefined' && require,
          register: register,
          registerDynamic: registerDynamic,
          get: load, 
          set: function(name, module) {
            modules[name] = module; 
          },
          newModule: function(module) {
            return module;
          }
        };
        System.set('@empty', {});

        // register external dependencies
        for (var i = 0; i < depNames.length; i++) (function(depName, dep) {
          if (dep && dep.__esModule)
            System.register(depName, [], function(_export) {
              return {
                setters: [],
                execute: function() {
                  for (var p in dep)
                    if (p != '__esModule' && !(typeof p == 'object' && p + '' == 'Module'))
                      _export(p, dep[p]);
                }
              };
            });
          else
            System.registerDynamic(depName, [], false, function() {
              return dep;
            });
        })(depNames[i], arguments[i]);

        // register modules in this bundle
        declare(System);

        // load mains
        var firstLoad = load(mains[0]);
        if (mains.length > 1)
          for (var i = 1; i < mains.length; i++)
            load(mains[i]);

        if (firstLoad.__useDefault)
          return firstLoad['default'];
        else
          return firstLoad;
      });
    };
  };

})(typeof self != 'undefined' ? self : global)
/* (['mainModule'], ['external-dep'], function($__System) {
  System.register(...);
})
(function(factory) {
  if (typeof define && define.amd)
    define(['external-dep'], factory);
  // etc UMD / module pattern
})*/

(['0'], [], function($__System) {

(function(__global) {
  var loader = $__System;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++)
      if (this[i] === item)
        return i;
    return -1;
  }

  function readMemberExpression(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
      value = value[pParts.shift()];
    return value;
  }

  // bare minimum ignores for IE8
  var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external', 'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB'];

  var globalSnapshot;

  function forEachGlobal(callback) {
    if (Object.keys)
      Object.keys(__global).forEach(callback);
    else
      for (var g in __global) {
        if (!hasOwnProperty.call(__global, g))
          continue;
        callback(g);
      }
  }

  function forEachGlobalValue(callback) {
    forEachGlobal(function(globalName) {
      if (indexOf.call(ignoredGlobalProps, globalName) != -1)
        return;
      try {
        var value = __global[globalName];
      }
      catch (e) {
        ignoredGlobalProps.push(globalName);
      }
      callback(globalName, value);
    });
  }

  loader.set('@@global-helpers', loader.newModule({
    prepareGlobal: function(moduleName, exportName, globals) {
      // disable module detection
      var curDefine = __global.define;
       
      __global.define = undefined;
      __global.exports = undefined;
      if (__global.module && __global.module.exports)
        __global.module = undefined;

      // set globals
      var oldGlobals;
      if (globals) {
        oldGlobals = {};
        for (var g in globals) {
          oldGlobals[g] = globals[g];
          __global[g] = globals[g];
        }
      }

      // store a complete copy of the global object in order to detect changes
      if (!exportName) {
        globalSnapshot = {};

        forEachGlobalValue(function(name, value) {
          globalSnapshot[name] = value;
        });
      }

      // return function to retrieve global
      return function() {
        var globalValue;

        if (exportName) {
          globalValue = readMemberExpression(exportName, __global);
        }
        else {
          var singleGlobal;
          var multipleExports;
          var exports = {};

          forEachGlobalValue(function(name, value) {
            if (globalSnapshot[name] === value)
              return;
            if (typeof value == 'undefined')
              return;
            exports[name] = value;

            if (typeof singleGlobal != 'undefined') {
              if (!multipleExports && singleGlobal !== value)
                multipleExports = true;
            }
            else {
              singleGlobal = value;
            }
          });
          globalValue = multipleExports ? exports : singleGlobal;
        }

        // revert globals
        if (oldGlobals) {
          for (var g in oldGlobals)
            __global[g] = oldGlobals[g];
        }
        __global.define = curDefine;

        return globalValue;
      };
    }
  }));

})(typeof self != 'undefined' ? self : global);

$__System.registerDynamic("1", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    this["bootstrap"] = bootstrap;
    this["_classCallCheck"] = _classCallCheck;
    this["ComponentHandlerDescriptor"] = ComponentHandlerDescriptor;
    this["Component"] = Component;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["Directive"] = Directive;
    this["_classCallCheck"] = _classCallCheck;
    this["normalizeDirectiveName"] = normalizeDirectiveName;
    this["denormalizeDirectiveName"] = denormalizeDirectiveName;
    this["InjectHandlerDescriptor"] = InjectHandlerDescriptor;
    this["Inject"] = Inject;
    this["_classCallCheck"] = _classCallCheck;
    this["makeMap"] = makeMap;
    this["HTMLParser"] = HTMLParser;
    this["HTMLtoXML"] = HTMLtoXML;
    this["HTMLtoDOM"] = HTMLtoDOM;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["setPrimitive"] = setPrimitive;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["Module"] = Module;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["pathToRegexp"] = pathToRegexp;
    this["RouterConfigHandlerDescriptor"] = RouterConfigHandlerDescriptor;
    this["RouterConfig"] = RouterConfig;
    this["Runnable"] = Runnable;
    this["_toConsumableArray"] = _toConsumableArray;
    this["isDescriptor"] = isDescriptor;
    this["decorate"] = decorate;
    this["first"] = first;
    this["_classCallCheck"] = _classCallCheck;
    this["Bindable"] = Bindable;
    this["ViewHandlerDescriptor"] = ViewHandlerDescriptor;
    this["View"] = View;
    this["_classCallCheck"] = _classCallCheck;
    this["elementAttrs"] = elementAttrs;
    this["sameAttributes"] = sameAttributes;
    var _createClass = this["_createClass"];
    var HTTP = this["HTTP"];
    var Components = this["Components"];
    var _slicedToArray = this["_slicedToArray"];
    var DataFor = this["DataFor"];
    var DataIf = this["DataIf"];
    var DataModel = this["DataModel"];
    var Directives = this["Directives"];
    var Injector = this["Injector"];
    var startTag = this["startTag"];
    var endTag = this["endTag"];
    var attr = this["attr"];
    var empty = this["empty"];
    var block = this["block"];
    var inline = this["inline"];
    var closeSelf = this["closeSelf"];
    var fillAttrs = this["fillAttrs"];
    var special = this["special"];
    var DOM = this["DOM"];
    var EventBinder = this["EventBinder"];
    var EventBus = this["EventBus"];
    var EventNameNormalizer = this["EventNameNormalizer"];
    var Render = this["Render"];
    var Router = this["Router"];
    var _slice = this["_slice"];
    var Binder = this["Binder"];
    var Views = this["Views"];
    'use strict';
    'use strict';
    function bootstrap(target) {
      Injector.get(target).run();
      Router.run();
      Directives.run();
      Components.run();
      Binder.run();
    }
    "use strict";
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var HTTP = (function() {
      function HTTP() {
        _classCallCheck(this, HTTP);
      }
      _createClass(HTTP, null, [{
        key: "init",
        value: function init() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {
            method: 'GET',
            headers: {},
            cache: false,
            async: false,
            timeout: 0
          } : arguments[0];
          function toQueryString(obj) {
            var parts = [];
            for (var i in obj) {
              if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
              }
            }
            return parts.join("&");
          }
          function appendQuery(url, query) {
            if (query == '')
              return url;
            return (url + '&' + query).replace(/[&?]{1,2}/, '?');
          }
          function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
              xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
              xhr = new XDomainRequest();
              xhr.open(method, url);
            } else {
              xhr = null;
            }
            return xhr;
          }
          if (!options.url) {
            throw new Error("Url is needed");
          }
          if (options.params) {
            options.url = appendQuery(options.url, toQueryString(options.params));
          }
          if (options && options.data) {
            options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/x-www-form-urlencoded';
            var queryString = options.data ? toQueryString(options.data) : null;
            if (queryString) {
              options.headers["Content-length"] = queryString.length;
            }
          }
          if (options.cache) {
            options.url = appendQuery(options.url, '_=' + +new Date());
          }
          var promise = new Promise(function(resolve, reject) {
            var request = createCORSRequest(options.method, options.url);
            if (options && options.headers) {
              Object.keys(options.headers).forEach(function(key) {
                request.setRequestHeader(key, options.headers[key]);
              });
            }
            if (this.withCredentials) {
              request.withCredentials = true;
            }
            request.onload = function() {
              if (request.status === 200) {
                resolve(request.responseText);
              } else {
                reject(new Error("Status code was " + request.status));
              }
            };
            request.onerror = function() {
              reject(new Error("Can't XHR " + JSON.stringify(options.url)));
            };
            if (options.timeout > 0) {
              var timeout = setTimeout(function() {
                xhr.onreadystatechange = function() {};
                xhr.abort();
                clearTimeout(timeout);
              }, options.timeout);
            }
            request.send(options && options.data ? toQueryString(options.data) : null);
          });
          return promise;
        }
      }, {
        key: "get",
        value: function get(url) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          options.method = 'GET';
          options.url = url;
          return this.init(options);
        }
      }, {
        key: "post",
        value: function post(url) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          options.method = 'POST';
          options.url = url;
          return this.init(options);
        }
      }, {
        key: "put",
        value: function put() {}
      }, {
        key: "delete",
        value: function _delete() {}
      }, {
        key: "head",
        value: function head() {}
      }, {
        key: "trace",
        value: function trace() {}
      }, {
        key: "options",
        value: function options() {}
      }, {
        key: "patch",
        value: function patch() {}
      }]);
      return HTTP;
    })();
    'use strict';
    function ComponentHandlerDescriptor(target, value) {
      Components.components.push({
        target: target,
        value: value
      });
    }
    function Component(arg) {
      return decorate(ComponentHandlerDescriptor, arg);
    }
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Components = (function() {
      function Components() {
        _classCallCheck(this, Components);
      }
      _createClass(Components, null, [{
        key: 'parse',
        value: function parse(node, name, attrs) {
          var component = Components.components.filter(function(component) {
            return component.value.name === name;
          });
          Views.parse(node, first.call(component));
        }
      }, {
        key: 'run',
        value: function run() {
          document.addEventListener("DOMContentLoaded", function(event) {
            DOM.parse(event.target.body);
          });
        }
      }, {
        key: 'components',
        value: [],
        enumerable: true
      }]);
      return Components;
    })();
    'use strict';
    var _slicedToArray = (function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
          for (var _i = arr[Symbol.iterator](),
              _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i['return'])
              _i['return']();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }
      };
    })();
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var DataFor = (function() {
      function DataFor() {
        _classCallCheck(this, DataFor);
      }
      _createClass(DataFor, [{
        key: 'render',
        value: function render(data, element, value, target) {
          var cloneElement = element.cloneNode(true);
          var parentNode = element.parentNode;
          var _value$match = value.match(/([$a-zA-Z0-9]+)/g);
          var _value$match2 = _slicedToArray(_value$match, 6);
          var iterator = _value$match2[0];
          var list = _value$match2[2];
          var track = _value$match2[3];
          var by = _value$match2[4];
          var trackBy = _value$match2[5];
          parentNode.removeChild(element);
          data[list].forEach(function(item, index) {
            var contextData = {};
            contextData[iterator] = item;
            if (!!trackBy) {
              contextData[trackBy] = index;
            }
            var childElement = cloneElement.cloneNode(true);
            var args = childElement.innerHTML.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
            args = args.length > 0 ? args.split(/,/) : [];
            oldArgs = '(' + args.join(',') + ')';
            newArgs = '(' + args.map(function(item) {
              return Render.START_DELIMITER + item + Render.END_DELIMITER;
            }).join(',') + ')';
            childElement.innerHTML = childElement.innerHTML.replace(oldArgs, newArgs);
            childElement.innerHTML = Render.render(childElement.innerHTML, contextData);
            parentNode.appendChild(childElement);
          });
        }
      }]);
      return DataFor;
    })();
    "use strict";
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var DataIf = (function() {
      function DataIf() {
        _classCallCheck(this, DataIf);
      }
      _createClass(DataIf, [{
        key: "render",
        value: function render(data, element, value) {
          if (!data[value]) {
            element.parentNode.removeChild(element);
          }
        }
      }]);
      return DataIf;
    })();
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var DataModel = (function() {
      function DataModel() {
        _classCallCheck(this, DataModel);
      }
      _createClass(DataModel, [{
        key: 'render',
        value: function render(data, element, value, target) {
          var instance = Injector.instances[target.name];
          var eventName = EventNameNormalizer.normalize(target, EventBus.MODEL_CHANGE_DETECTED);
          Object.defineProperty(instance, value, {
            get: function get() {
              return bValue;
            },
            set: function set(newValue) {
              bValue = newValue;
              var data = {};
              data[value] = newValue;
              EventBus.publish(eventName, data);
            },
            enumerable: true,
            configurable: true
          });
          instance[value] = element.value;
          EventBus.subscribe(eventName, function(e, data) {
            var _context;
            var key = (_context = Object.keys(data), first).call(_context);
            Views.parseModel(key, data, target);
          });
        }
      }]);
      return DataModel;
    })();
    'use strict';
    function Directive(target) {
      console.log('Directive', Directives, target.name);
    }
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function normalizeDirectiveName(name) {
      name = name.charAt(0).toLowerCase() + name.slice(1);
      return name.replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
      });
    }
    function denormalizeDirectiveName(name) {
      name = name.charAt(0).toLowerCase() + name.slice(1);
      return name.replace(/([A-Z])/g, function($1) {
        return "-" + $1.toLowerCase();
      });
    }
    var Directives = (function() {
      function Directives() {
        _classCallCheck(this, Directives);
      }
      _createClass(Directives, null, [{
        key: 'add',
        value: function add(name, directive) {
          Directives.directives[normalizeDirectiveName(name)] = directive;
        }
      }, {
        key: 'get',
        value: function get(name) {
          return Directives.directives[name];
        }
      }, {
        key: 'run',
        value: function run() {
          var directives = [{
            name: DataIf.name,
            directive: Injector.get(DataIf)
          }, {
            name: DataFor.name,
            directive: Injector.get(DataFor)
          }, {
            name: DataModel.name,
            directive: Injector.get(DataModel)
          }];
          directives.forEach(function(item) {
            var name = item.name;
            var directive = item.directive;
            Directives.add(name, directive);
          });
        }
      }, {
        key: 'directives',
        value: {},
        enumerable: true
      }]);
      return Directives;
    })();
    Directives.PREFIX = "data-";
    'use strict';
    function InjectHandlerDescriptor(target, values) {
      target.dependencies = values;
    }
    function Inject() {
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return decorate(InjectHandlerDescriptor, args);
    }
    "use strict";
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Injector = (function() {
      function Injector() {
        _classCallCheck(this, Injector);
      }
      _createClass(Injector, null, [{
        key: "instantiate",
        value: function instantiate(target) {
          var instance = undefined;
          if (!!Injector.instances.hasOwnProperty(target.name)) {
            instance = Injector.instances[target.name];
          } else {
            instance = Injector.resolve(target);
            Injector.instances[target.name] = instance;
          }
          return instance;
        }
      }, {
        key: "resolve",
        value: function resolve(target) {
          var dependencies = {};
          if (!!target.dependencies) {
            dependencies = target.dependencies.map(function(target) {
              return Injector.instantiate(target);
            });
          }
          var proto = target.prototype;
          var instance = Object(proto) === proto ? Object.create(proto) : {};
          var result = Function.prototype.apply.call(target, instance, dependencies);
          return Object(result) === result ? result : instance;
        }
      }, {
        key: "get",
        value: function get(target) {
          return Injector.instantiate(target);
        }
      }, {
        key: "instances",
        value: {},
        enumerable: true
      }]);
      return Injector;
    })();
    "use strict";
    function makeMap(str) {
      var obj = {},
          items = str.split(",");
      for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
      return obj;
    }
    var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
    var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
    var block = makeMap("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
    var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
    var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
    var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
    var special = makeMap("script,style");
    function HTMLParser(html, handler) {
      var index,
          chars,
          match,
          stack = [],
          last = html;
      stack.last = function() {
        return this[this.length - 1];
      };
      while (html) {
        chars = true;
        if (!stack.last() || !special[stack.last()]) {
          if (html.indexOf("<!--") == 0) {
            index = html.indexOf("-->");
            if (index >= 0) {
              if (handler.comment)
                handler.comment(html.substring(4, index));
              html = html.substring(index + 3);
              chars = false;
            }
          } else if (html.indexOf("</") == 0) {
            match = html.match(endTag);
            if (match) {
              html = html.substring(match[0].length);
              match[0].replace(endTag, parseEndTag);
              chars = false;
            }
          } else if (html.indexOf("<") == 0) {
            match = html.match(startTag);
            if (match) {
              html = html.substring(match[0].length);
              match[0].replace(startTag, parseStartTag);
              chars = false;
            }
          }
          if (chars) {
            index = html.indexOf("<");
            var text = index < 0 ? html : html.substring(0, index);
            html = index < 0 ? "" : html.substring(index);
            if (handler.chars)
              handler.chars(text);
          }
        } else {
          html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function(all, text) {
            text = text.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1");
            if (handler.chars)
              handler.chars(text);
            return "";
          });
          parseEndTag("", stack.last());
        }
        if (html == last)
          throw "Parse Error: " + html;
        last = html;
      }
      parseEndTag();
      function parseStartTag(tag, tagName, rest, unary) {
        tagName = tagName.toLowerCase();
        if (block[tagName]) {
          while (stack.last() && inline[stack.last()]) {
            parseEndTag("", stack.last());
          }
        }
        if (closeSelf[tagName] && stack.last() == tagName) {
          parseEndTag("", tagName);
        }
        unary = empty[tagName] || !!unary;
        if (!unary)
          stack.push(tagName);
        if (handler.start) {
          var attrs = [];
          rest.replace(attr, function(match, name) {
            var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
            attrs.push({
              name: name,
              value: value,
              escaped: value.replace(/(^|[^\\])"/g, '$1\\\"')
            });
          });
          if (handler.start)
            handler.start(tagName, attrs, unary);
        }
      }
      function parseEndTag(tag, tagName) {
        if (!tagName)
          var pos = 0;
        else
          for (var pos = stack.length - 1; pos >= 0; pos--)
            if (stack[pos] == tagName)
              break;
        if (pos >= 0) {
          for (var i = stack.length - 1; i >= pos; i--)
            if (handler.end)
              handler.end(stack[i]);
          stack.length = pos;
        }
      }
    }
    function HTMLtoXML(html) {
      var results = "";
      HTMLParser(html, {
        start: function start(tag, attrs, unary) {
          results += "<" + tag;
          for (var i = 0; i < attrs.length; i++)
            results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
          results += (unary ? "/" : "") + ">";
        },
        end: function end(tag) {
          results += "</" + tag + ">";
        },
        chars: function chars(text) {
          results += text;
        },
        comment: function comment(text) {
          results += "<!--" + text + "-->";
        }
      });
      return results;
    }
    function HTMLtoDOM(html, doc) {
      var one = makeMap("html,head,body,title");
      var structure = {
        link: "head",
        base: "head"
      };
      if (!doc) {
        if (typeof DOMDocument != "undefined")
          doc = new DOMDocument();
        else if (typeof document != "undefined" && document.implementation && document.implementation.createDocument)
          doc = document.implementation.createDocument("", "", null);
        else if (typeof ActiveX != "undefined")
          doc = new ActiveXObject("Msxml.DOMDocument");
      } else
        doc = doc.ownerDocument || doc.getOwnerDocument && doc.getOwnerDocument() || doc;
      var elems = [],
          documentElement = doc.documentElement || doc.getDocumentElement && doc.getDocumentElement();
      if (!documentElement && doc.createElement)
        (function() {
          var html = doc.createElement("html");
          var head = doc.createElement("head");
          head.appendChild(doc.createElement("title"));
          html.appendChild(head);
          html.appendChild(doc.createElement("body"));
          doc.appendChild(html);
        })();
      if (doc.getElementsByTagName)
        for (var i in one)
          one[i] = doc.getElementsByTagName(i)[0];
      var curParentNode = one.body;
      HTMLParser(html, {
        start: function start(tagName, attrs, unary) {
          if (one[tagName]) {
            curParentNode = one[tagName];
            if (!unary) {
              elems.push(curParentNode);
            }
            return;
          }
          var elem = doc.createElement(tagName);
          for (var attr in attrs)
            elem.setAttribute(attrs[attr].name, attrs[attr].value);
          if (structure[tagName] && typeof one[structure[tagName]] != "boolean")
            one[structure[tagName]].appendChild(elem);
          else if (curParentNode && curParentNode.appendChild)
            curParentNode.appendChild(elem);
          if (!unary) {
            elems.push(elem);
            curParentNode = elem;
          }
        },
        end: function end(tag) {
          elems.length -= 1;
          curParentNode = elems[elems.length - 1];
        },
        chars: function chars(text) {
          curParentNode.appendChild(doc.createTextNode(text));
        },
        comment: function comment(text) {}
      });
      return doc;
    }
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var DOM = (function() {
      function DOM() {
        _classCallCheck(this, DOM);
      }
      _createClass(DOM, null, [{
        key: 'getHTML',
        value: function getHTML(node) {
          return node.innerHTML.toString();
        }
      }, {
        key: 'parse',
        value: function parse(node) {
          var items = node.getElementsByTagName("*");
          for (var i = 0; i < items.length; i++) {
            var element = items[i];
            var tag = element.tagName.toLowerCase(),
                attrs = Array.prototype.slice.call(element.attributes);
            Components.parse(element, tag, attrs);
          }
        }
      }]);
      return DOM;
    })();
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function setPrimitive(value) {
      if (!isNaN(value)) {
        if (/[0-9]+/.test(value)) {
          return parseInt(value, 10);
        }
        if (/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(value)) {
          return parseFloat(value);
        }
      }
      return value;
    }
    var EventBinder = (function() {
      function EventBinder() {
        _classCallCheck(this, EventBinder);
      }
      _createClass(EventBinder, null, [{
        key: 'bind',
        value: function bind(element, attrs, target) {
          if (attrs.length > 0) {
            (function() {
              var instance = Injector.instances[target.name];
              attrs.forEach(function(attr) {
                var attrName = attr.name,
                    attrValue = attr.value;
                if (attrName.charAt(0) === '_') {
                  var eventName = attrName.substring(1);
                  element.addEventListener(eventName, function(e) {
                    var methodName = attrValue.match(/^(.*)\(/mi)[1];
                    var args = attrValue.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
                    args = args.length > 0 ? args.split(/,/) : [];
                    args = args.map(function(arg) {
                      return setPrimitive(arg);
                    });
                    instance[methodName].apply(instance, args);
                  }, false);
                }
                if (attrName === 'data-model') {
                  element.addEventListener('input', function(e) {
                    instance[attrValue] = element.value;
                  }, false);
                }
              });
            })();
          }
        }
      }]);
      return EventBinder;
    })();
    "use strict";
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var EventBus = (function() {
      function EventBus() {
        _classCallCheck(this, EventBus);
      }
      _createClass(EventBus, null, [{
        key: "subscribe",
        value: function subscribe(topic, callback) {
          if (!EventBus.topics.hasOwnProperty(topic)) {
            EventBus.topics[topic] = [];
          }
          var token = (++EventBus.lastUid).toString();
          EventBus.topics[topic].push({
            token: token,
            callback: callback
          });
          return token;
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe(token) {
          for (var m in EventBus.topics) {
            if (EventBus.topics.hasOwnProperty(m)) {
              for (var i = 0,
                  j = EventBus.topics[m].length; i < j; i++) {
                if (EventBus.topics[m][i].token === token) {
                  EventBus.topics[m].splice(i, 1);
                  return token;
                }
              }
            }
          }
          return false;
        }
      }, {
        key: "publish",
        value: function publish(topic, data) {
          if (!EventBus.topics.hasOwnProperty(topic)) {
            return false;
          }
          function notify() {
            var subscribers = EventBus.topics[topic],
                throwException = function throwException(e) {
                  return function() {
                    throw e;
                  };
                };
            for (var i = 0,
                j = subscribers.length; i < j; i++) {
              try {
                subscribers[i].callback(topic, data);
              } catch (e) {
                setTimeout(throwException(e), 0);
              }
            }
          }
          ;
          setTimeout(notify, 0);
          return true;
        }
      }, {
        key: "topics",
        value: {},
        enumerable: true
      }, {
        key: "lastUid",
        value: -1,
        enumerable: true
      }]);
      return EventBus;
    })();
    EventBus.CHANGE_DETECTED = "CHANGE_DETECTED";
    EventBus.MODEL_CHANGE_DETECTED = "MODEL_CHANGE_DETECTED";
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var EventNameNormalizer = (function() {
      function EventNameNormalizer() {
        _classCallCheck(this, EventNameNormalizer);
      }
      _createClass(EventNameNormalizer, null, [{
        key: 'normalize',
        value: function normalize(target, eventName) {
          return target.name.toUpperCase() + '_' + eventName;
        }
      }]);
      return EventNameNormalizer;
    })();
    "use strict";
    function Module() {}
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Render = (function() {
      function Render() {
        _classCallCheck(this, Render);
      }
      _createClass(Render, null, [{
        key: 'normalize',
        value: function normalize(html) {
          var coreDirectives = [];
          for (var directive in Directives.directives) {
            coreDirectives.push(directive.replace(Directives.PREFIX, ''));
          }
          var pattern = '\\*(' + coreDirectives.join('|') + ')';
          var regExp = new RegExp(pattern, "gm");
          return html.replace(regExp, function(p1, p2) {
            return Directives.PREFIX + p2;
          });
        }
      }, {
        key: 'render',
        value: function render(html, options) {
          var re = new RegExp(Render.START_DELIMITER + '([^' + Render.END_DELIMITER + ']+)?' + Render.END_DELIMITER, 'g'),
              reExp = /^( )?({|})(.*)*/g,
              code = 'var r=[];\n',
              cursor = 0,
              match;
          var add = function add(line, js) {
            js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' : code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
            return add;
          };
          while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))('this.' + match[1], true);
            cursor = match.index + match[0].length;
          }
          add(html.substr(cursor, html.length - cursor));
          code += 'return r.join("");';
          return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
        }
      }, {
        key: 'getDOM',
        value: function getDOM(parent) {
          var nodes = parent.childNodes[0].childNodes[1].childNodes;
          console.log(nodes);
          return nodes;
        }
      }]);
      return Render;
    })();
    Render.START_DELIMITER = "{{";
    Render.END_DELIMITER = "}}";
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Router = (function() {
      function Router() {
        _classCallCheck(this, Router);
      }
      _createClass(Router, null, [{
        key: 'getHash',
        value: function getHash() {
          return window.location.hash.substring(1);
        }
      }, {
        key: 'route',
        value: function route() {
          Router.routes.forEach(function(route) {
            var path = route.value.path;
            if (!!path.test(Router.getHash())) {
              Injector.get(route.target).run();
            }
          });
        }
      }, {
        key: 'run',
        value: function run() {
          window.addEventListener('hashchange', Router.route, false);
        }
      }, {
        key: 'routes',
        value: [],
        enumerable: true
      }]);
      return Router;
    })();
    'use strict';
    function pathToRegexp(path, keys, sensitive, strict) {
      if (path instanceof RegExp)
        return path;
      if (path instanceof Array)
        path = '(' + path.join('|') + ')';
      path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
        keys.push({
          name: key,
          optional: !!optional
        });
        slash = slash || '';
        return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
      }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
      return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    }
    function RouterConfigHandlerDescriptor(target, value) {
      value.path = pathToRegexp(value.path, [], false, false);
      Router.routes.push({
        target: target,
        value: value
      });
    }
    function RouterConfig(arg) {
      return decorate(RouterConfigHandlerDescriptor, arg);
    }
    "use strict";
    function Runnable(target) {
      Object.assign(target.prototype, {run: function run() {}});
    }
    'use strict';
    var _slice = Array.prototype.slice;
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0,
            arr2 = Array(arr.length); i < arr.length; i++)
          arr2[i] = arr[i];
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    function isDescriptor(desc) {
      if (!desc || !desc.hasOwnProperty) {
        return false;
      }
      var keys = ['value', 'get', 'set'];
      for (var i = 0,
          l = keys.length; i < l; i++) {
        if (desc.hasOwnProperty(keys[i])) {
          return true;
        }
      }
      return false;
    }
    function decorate(handleDescriptor, entryArgs) {
      if (isDescriptor(entryArgs[entryArgs.length - 1])) {
        return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
      } else {
        return function() {
          return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
        };
      }
    }
    function first() {
      return this[0];
    }
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function Bindable(target, key) {
      if (target.bindableFields) {
        target.bindableFields.push(key);
      } else {
        target.bindableFields = [key];
      }
    }
    var Binder = (function() {
      function Binder() {
        _classCallCheck(this, Binder);
      }
      _createClass(Binder, null, [{
        key: 'bindArray',
        value: function bindArray(target, key, eventName) {
          var methods = ['push', 'pop', 'reverse', 'shift', 'unshift', 'splice'];
          methods.forEach(function(name) {
            Object.defineProperty(target[key], name, {
              configurable: false,
              enumerable: false,
              writable: false,
              value: function value() {
                Array.prototype[name].apply(this, arguments);
                EventBus.publish(eventName);
                return this.length;
              }
            });
          });
        }
      }, {
        key: 'bindOther',
        value: function bindOther(target, key, eventName) {
          var value = target[key],
              privateProperty = key + '_' + +new Date();
          Object.defineProperty(target, privateProperty, {
            enumerable: false,
            configurable: false,
            writable: true
          });
          Object.defineProperty(target, key, {
            set: function set(newValue) {
              this[privateProperty] = newValue;
              EventBus.publish(eventName);
            },
            get: function get() {
              return this[privateProperty];
            }
          });
          target[key] = value;
        }
      }, {
        key: 'run',
        value: function run() {
          var _loop = function() {
            var instance = Injector.instances[instanceName];
            if (!!instance.bindableFields) {
              (function() {
                var target = {name: instanceName};
                var eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED);
                instance.bindableFields.forEach(function(key) {
                  if (instance[key] instanceof Array) {
                    Binder.bindArray(instance, key, eventName);
                  } else {
                    Binder.bindOther(instance, key, eventName);
                  }
                });
              })();
            }
          };
          for (var instanceName in Injector.instances) {
            _loop();
          }
        }
      }]);
      return Binder;
    })();
    'use strict';
    function ViewHandlerDescriptor(target, value) {
      Views.views[target.name] = value;
    }
    function View(viewConfig) {
      return decorate(ViewHandlerDescriptor, viewConfig);
    }
    'use strict';
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function elementAttrs(element) {
      var nodeAttrs = Array.prototype.slice.call(element.attributes);
      return nodeAttrs.map(function(attribute) {
        return {
          name: attribute.name,
          value: attribute.value,
          escaped: attribute.value.replace(/(^|[^\\])"/g, '$1\\\"')
        };
      });
    }
    function sameAttributes(elementAttrs, attrs) {
      return elementAttrs.length === attrs.length && JSON.stringify(elementAttrs) === JSON.stringify(attrs);
    }
    var Views = (function() {
      function Views() {
        _classCallCheck(this, Views);
      }
      _createClass(Views, null, [{
        key: 'parseModel',
        value: function parseModel(key, data, target) {
          var view = Views.views[target.name];
          node = view.nodeCached, template = view.templateCached;
          var wrapper = document.createElement('div');
          wrapper.innerHTML = Render.normalize(template);
          var wrapperChildNodes = Array.prototype.slice.call(wrapper.getElementsByTagName("*")).filter(function(element) {
            return element.nodeType === 1;
          });
          wrapperChildNodes = wrapperChildNodes.filter(function(element) {
            var regexp = new RegExp('{{' + key + '}}');
            return regexp.test(element.innerText);
          });
          wrapperChildNodes.forEach(function(wrapperChildNode) {
            var attrs = elementAttrs(wrapperChildNode);
            var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter(function(element) {
              return element.nodeType === 1;
            });
            var childNode = childNodes.filter(function(element) {
              var nodeAttrs = !!element.hasAttributes() ? elementAttrs(element) : [];
              return element.nodeName.toLowerCase() === wrapperChildNode.nodeName.toLowerCase() && sameAttributes(nodeAttrs, attrs);
            });
            childNode.forEach(function(cn) {
              cn.innerHTML = Render.render(wrapperChildNode.innerHTML, data);
            });
          });
        }
      }, {
        key: 'parseAll',
        value: function parseAll(node, template, data, target) {
          var wrapper = document.createElement('div');
          wrapper.innerHTML = Render.normalize(template);
          var wrapperChildNodes = Array.prototype.slice.call(wrapper.getElementsByTagName("*")).filter(function(element) {
            return element.nodeType === 1;
          });
          wrapperChildNodes.forEach(function(element) {
            if (!!element.hasAttributes()) {
              var attrs = elementAttrs(element);
              attrs.forEach(function(attr) {
                var directive = Directives.get(attr.name);
                if (!!directive) {
                  directive.render(data, element, attr.value, target);
                }
              });
            }
          });
          node.innerHTML = Render.render(wrapper.innerHTML, data);
          var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter(function(element) {
            return element.nodeType === 1;
          });
          childNodes.forEach(function(cn) {
            var attrs = !!cn.hasAttributes() ? elementAttrs(cn) : [];
            EventBinder.bind(cn, attrs, target);
          });
        }
      }, {
        key: 'parse',
        value: function parse(node, component) {
          if (!!component) {
            var promise;
            (function() {
              var view = Views.views[component.target.name];
              if (!!view) {
                if (!!view.hasOwnProperty(Views.TEMPLATE_URL)) {
                  promise = HTTP.get(view[Views.TEMPLATE_URL]);
                } else if (!!view.hasOwnProperty(Views.TEMPLATE) && !view.hasOwnProperty(Views.TEMPLATE_URL)) {
                  promise = Promise.resolve(view[Views.TEMPLATE]);
                } else {
                  throw new Exception("View need templateUrl or template attributes");
                }
                promise.then(function(template) {
                  view.templateCached = template;
                  view.nodeCached = node;
                  var target = component.target,
                      eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED),
                      instance = Injector.instances[target.name];
                  Views.parseAll(node, template, instance, target);
                  EventBus.subscribe(eventName, function() {
                    Views.parseAll(node, template, instance, target);
                  });
                });
              }
            })();
          }
        }
      }, {
        key: 'views',
        value: {},
        enumerable: true
      }]);
      return Views;
    })();
    Views.TEMPLATE_URL = "templateUrl";
    Views.TEMPLATE = "template";
    this["_createClass"] = _createClass;
    this["HTTP"] = HTTP;
    this["Components"] = Components;
    this["_slicedToArray"] = _slicedToArray;
    this["DataFor"] = DataFor;
    this["DataIf"] = DataIf;
    this["DataModel"] = DataModel;
    this["Directives"] = Directives;
    this["Injector"] = Injector;
    this["startTag"] = startTag;
    this["endTag"] = endTag;
    this["attr"] = attr;
    this["empty"] = empty;
    this["block"] = block;
    this["inline"] = inline;
    this["closeSelf"] = closeSelf;
    this["fillAttrs"] = fillAttrs;
    this["special"] = special;
    this["DOM"] = DOM;
    this["EventBinder"] = EventBinder;
    this["EventBus"] = EventBus;
    this["EventNameNormalizer"] = EventNameNormalizer;
    this["Render"] = Render;
    this["Router"] = Router;
    this["_slice"] = _slice;
    this["Binder"] = Binder;
    this["Views"] = Views;
  })();
  return _retrieveGlobal();
});

$__System.register('0', ['1'], function (_export) {
  'use strict';

  var bootstrap, Inject, Component, View, Bindable, BindableArray, Runnable, App;
  return {
    setters: [function (_) {
      bootstrap = _.bootstrap;
      Inject = _.Inject;
      Component = _.Component;
      View = _.View;
      Bindable = _.Bindable;
      BindableArray = _.BindableArray;
      Runnable = _.Runnable;
    }],
    execute: function () {
      App = (function () {
        var _instanceInitializers = {};

        function App() {
          babelHelpers.classCallCheck(this, _App);
          babelHelpers.defineDecoratedPropertyDescriptor(this, 'name', _instanceInitializers);
          babelHelpers.defineDecoratedPropertyDescriptor(this, 'todos', _instanceInitializers);
        }

        babelHelpers.createDecoratedClass(App, [{
          key: 'add',
          value: function add() {
            this.todos.push(this.item);
          }
        }, {
          key: 'remove',
          value: function remove(item, index) {
            this.todos.splice(index, 1);
          }
        }, {
          key: 'clean',
          value: function clean() {
            while (this.todos.length > 0) {
              this.todos.splice(0, 1);
            }
          }
        }, {
          key: 'name',
          decorators: [Bindable],
          initializer: function initializer() {
            return "My First App!!";
          },
          enumerable: true
        }, {
          key: 'todos',
          decorators: [Bindable],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }], null, _instanceInitializers);
        var _App = App;
        App = Runnable(App) || App;
        App = View({
          templateUrl: 'main_view.html'
        })(App) || App;
        App = Component({
          name: 'app'
        })(App) || App;
        return App;
      })();

      bootstrap(App);
    }
  };
});

})
(function(factory) {
  factory();
});