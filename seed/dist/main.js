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
    this["InjectHandlerDescriptor"] = InjectHandlerDescriptor;
    this["Inject"] = Inject;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["makeMap"] = makeMap;
    this["HTMLParser"] = HTMLParser;
    this["HTMLtoXML"] = HTMLtoXML;
    this["HTMLtoDOM"] = HTMLtoDOM;
    this["Module"] = Module;
    this["_classCallCheck"] = _classCallCheck;
    this["_classCallCheck"] = _classCallCheck;
    this["pathToRegexp"] = pathToRegexp;
    this["RouterConfigHandlerDescriptor"] = RouterConfigHandlerDescriptor;
    this["RouterConfig"] = RouterConfig;
    this["_toConsumableArray"] = _toConsumableArray;
    this["isDescriptor"] = isDescriptor;
    this["decorate"] = decorate;
    this["first"] = first;
    this["ViewHandlerDescriptor"] = ViewHandlerDescriptor;
    this["View"] = View;
    this["_classCallCheck"] = _classCallCheck;
    var _createClass = this["_createClass"];
    var HTTP = this["HTTP"];
    var Components = this["Components"];
    var Injector = this["Injector"];
    var DOM = this["DOM"];
    var startTag = this["startTag"];
    var endTag = this["endTag"];
    var attr = this["attr"];
    var empty = this["empty"];
    var block = this["block"];
    var inline = this["inline"];
    var closeSelf = this["closeSelf"];
    var fillAttrs = this["fillAttrs"];
    var special = this["special"];
    var Render = this["Render"];
    var Router = this["Router"];
    var _slice = this["_slice"];
    var Views = this["Views"];
    'use strict';
    'use strict';
    function bootstrap(target) {
      Injector.get(target).run();
      Router.run();
      Components.run();
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
      _createClass(HTTP, [{
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
          var instance;
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
            var n = items[i];
            var tag = n.tagName.toLowerCase(),
                attrs = [];
            Components.parse(n, tag, attrs);
          }
        }
      }]);
      return DOM;
    })();
    "use strict";
    function makeMap(str) {
      var obj = {},
          items = str.split(",");
      for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
      return obj;
    }
    var startTag = /^<([-A-Za-z0-9_]+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
    var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");
    var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");
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
        key: 'render',
        value: function render(html, options) {
          var re = /{{([^}}]+)?}}/g,
              reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
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
    function ViewHandlerDescriptor(target, value) {
      Views.views.push({
        target: target,
        value: value
      });
    }
    function View(arg) {
      return decorate(ViewHandlerDescriptor, arg);
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
    var Views = (function() {
      function Views() {
        _classCallCheck(this, Views);
      }
      _createClass(Views, null, [{
        key: 'parse',
        value: function parse(node, component) {
          if (!!component) {
            var _context;
            var view = Views.views.filter(function(view) {
              return view.target === component.target;
            });
            view = (_context = view, first).call(_context);
            if (!!view) {
              var template = view.value.template;
              var nodes = Render.getDOM(HTMLtoDOM(Render.render(template, {})));
              console.log(nodes);
              node.parentNode.replaceChild(first.call(nodes), node);
            }
          }
        }
      }, {
        key: 'views',
        value: [],
        enumerable: true
      }]);
      return Views;
    })();
    this["_createClass"] = _createClass;
    this["HTTP"] = HTTP;
    this["Components"] = Components;
    this["Injector"] = Injector;
    this["DOM"] = DOM;
    this["startTag"] = startTag;
    this["endTag"] = endTag;
    this["attr"] = attr;
    this["empty"] = empty;
    this["block"] = block;
    this["inline"] = inline;
    this["closeSelf"] = closeSelf;
    this["fillAttrs"] = fillAttrs;
    this["special"] = special;
    this["Render"] = Render;
    this["Router"] = Router;
    this["_slice"] = _slice;
    this["Views"] = Views;
  })();
  return _retrieveGlobal();
});

$__System.register('0', ['1', '2', '3', '4'], function (_export) {
  'use strict';

  var bootstrap, Inject, Component, View, Service, M1, M2, App;
  return {
    setters: [function (_) {
      bootstrap = _.bootstrap;
      Inject = _.Inject;
      Component = _.Component;
      View = _.View;
    }, function (_2) {
      Service = _2.Service;
    }, function (_3) {
      M1 = _3.M1;
    }, function (_4) {
      M2 = _4.M2;
    }],
    execute: function () {
      App = (function () {
        function App(m1, m2) {
          babelHelpers.classCallCheck(this, _App);

          this.m1 = m1;
          this.m2 = m2;
        }

        babelHelpers.createClass(App, [{
          key: 'run',
          value: function run() {
            var modules = [this.m1, this.m2];

            modules.forEach(function (module) {
              if (!!module.config) module.config();
            });

            //modules.forEach((module) => module.run());
          }
        }]);
        var _App = App;
        App = Inject(M1, M2)(App) || App;
        App = View({
          template: '<h1>App <strong>test</strong></h1><br/><p>App test</p>'
        })(App) || App;
        App = Component({
          name: 'app'
        })(App) || App;
        return App;
      })();

      bootstrap(App);

      /*
      @Component({
      	template:''
      })
      class Todo {
      	constructor() {}
      }
      */

      /*
      @Filter({
      	name: 'filterName'
      })
      class FilterName {
      	transform(value) {
      
      	}
      }
      */

      /*
      @View({
       templateUrl: '',
       filters: [FilterName]
      })
      */

      /*
      @Component({
      	tag: 'tabs',
      	attributes: []
      });
      */

      /*
      @Inject(Target)
      */

      /*
      @Route({
      
      })
      */

      //- login.html
      //<login></login>

      /*
      
      //- login
      @Router({
        name : 'login',
        path : '/login'
      })
      class LoginRouter {
        onEnter() {
        }
      
        onExit() {
        }
      }
      
      @Component({
        tag : 'login',
        attributes : []
      })
      class LoginComponent {}
      
      @View({
        templateUrl : 'login.html',
        filters : []
      })
      class LoginView {}
      
      
      @Module({
        router: LoginRouter,
        component: LoginComponent,
        view: LoginView
      })
      @Inject(Log)
      class Login {
        constructor(log) {
          this.log = log;
        }
      
        config() {
          this.log.debug('configuring Login');
        }
      
        run() {
          this.log.debug('running Login');
        }
      }
      
      bootstrap(Login);
      
      // Analysis.js
      class Analysis {}
      
      // EndUses.js
      class EndUses {}
      
      // LeakFinder.js
      class LeakFinder {}
      
      import {Analysis} from 'analysis/Analysis';
      import {EndUses} from 'end-uses/EndUses';
      import {LeakFinder} from 'leak-finder/LeakFinder';
      
      @Inject(Analysis, EndUses, LeakFinder)
      class BuntBrain {
        constructor(analysis, endUses, leakFinder) {
          this.analysis = analysis;
          this.endUses = endUses;
          this.leakFinder = leakFinder;
        }
      
        run() {
          let modules = [
            this.analysis,
            this.endUses,
            this.leakFinder
          ];
      
          modules.forEach((module) => module.config());
          modules.forEach((module) => module.run());
        }
      }
      
      bootstrap(BuntBrain);
      
      
      
      @Inject(Service)
      class main {
      	constructor(service) {
      		this.service = service;
      	}
      
      	run() {
      		console.log('My test app');
      		this.service.get();
      	}
      }
      
      bootstrap(main);
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      function RouterConfig(...values) {
        return function(target) {
          var name = target.name;
      
          Router.configs.push({
            name,
            values
          });
        }
      }
      
      function Inject(...values) {
        return function(target) {
          target.dependecies = values;
        }
      }
      
      class Router {
        static configs = [];
        static init() {
          console.log(Router.configs);
      
          window.addEventListener('onhashchange', () => {
            console.log(arguments);
        }, false);
      }
      }
      
      function bootstrap(target) {
        Router.init();
      }
      
      
      @RouterConfig({
        path : '/m1'
      })
      class M1 {
        constructor() {
          console.log('m1');
        }
      }
      
      @RouterConfig({
        path : '/m2'
      })
      class M2 {
        constructor() {
          console.log('m2');
        }
      }
      
      
      @Inject(M1, M2)
      class App {
        constructor(m1, m2) {
          console.log(m1, m2)
        }
      }
      
      
      bootstrap(App);
      
      */
    }
  };
});

$__System.register('3', ['1'], function (_export) {
  'use strict';

  var RouterConfig, M1;
  return {
    setters: [function (_) {
      RouterConfig = _.RouterConfig;
    }],
    execute: function () {
      M1 = (function () {
        function M1() {
          babelHelpers.classCallCheck(this, _M1);

          console.log('m1');
        }

        babelHelpers.createClass(M1, [{
          key: 'config',
          value: function config() {
            //this.log.debug('configuring Login');

            console.log('config m1');
          }
        }, {
          key: 'run',
          value: function run() {
            console.log('run m1');
          }
        }]);
        var _M1 = M1;
        M1 = RouterConfig({
          path: '/m1'
        })(M1) || M1;
        return M1;
      })();

      _export('M1', M1);
    }
  };
});

$__System.register('2', ['1'], function (_export) {
	'use strict';

	var Inject, HTTP, Service;
	return {
		setters: [function (_) {
			Inject = _.Inject;
			HTTP = _.HTTP;
		}],
		execute: function () {
			Service = (function () {
				function Service(http) {
					babelHelpers.classCallCheck(this, _Service);

					this.http = http;
				}

				babelHelpers.createClass(Service, [{
					key: 'get',
					value: function get() {
						this.http.get('data.json').then(function (data) {
							console.log(data);
						}, function (error) {
							console.log('error', error);
						});
					}
				}]);
				var _Service = Service;
				Service = Inject(HTTP)(Service) || Service;
				return Service;
			})();

			_export('Service', Service);
		}
	};
});

$__System.register('4', ['1'], function (_export) {
  'use strict';

  var RouterConfig, M2;
  return {
    setters: [function (_) {
      RouterConfig = _.RouterConfig;
    }],
    execute: function () {
      M2 = (function () {
        function M2() {
          babelHelpers.classCallCheck(this, _M2);

          console.log('m2');
        }

        babelHelpers.createClass(M2, [{
          key: 'config',
          value: function config() {
            //this.log.debug('configuring Login');
            console.log('config m2');
          }
        }, {
          key: 'run',
          value: function run() {
            //this.log.debug('running Login');
            console.log('run m2');
          }
        }]);
        var _M2 = M2;
        M2 = RouterConfig({
          path: '/m2'
        })(M2) || M2;
        return M2;
      })();

      _export('M2', M2);
    }
  };
});

})
(function(factory) {
  factory();
});