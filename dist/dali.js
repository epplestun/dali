'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bootstrap = require('core/bootstrap');

Object.defineProperty(exports, 'bootstrap', {
  enumerable: true,
  get: function get() {
    return _bootstrap.bootstrap;
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootstrap = bootstrap;

var _util = require('./util/util');

var _Injector = require('./di/Injector');

var _Router = require('./router/Router');

var _Components = require('./component/Components');

var _Bindable = require('./view/Bindable');

var _i18n = require('./i18n/i18n');

var _EventBus = require('./event/EventBus');

(0, _util.log)('bootstrap.js');

function bootstrap(target) {
  _EventBus.EventBus.subscribe(_i18n.i18n.TRANSLATION_LOADED, function () {
    _Injector.Injector.get(target).run();
    _Router.Router.run();
    _Components.Components.run();
    _Bindable.Binder.run();
  });
}
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP = exports.HTTP = (function () {
  function HTTP() {
    _classCallCheck(this, HTTP);
  }

  _createClass(HTTP, null, [{
    key: "init",
    value: function init() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? { method: 'GET', headers: {}, cache: false, async: false, timeout: 0 } : arguments[0];

      var toQueryString = function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
          }
        }
        return parts.join("&");
      };

      var appendQuery = function appendQuery(url, query) {
        if (query == '') return url;
        return (url + '&' + query).replace(/[&?]{1,2}/, '?');
      };

      var createCORSRequest = function createCORSRequest(method, url) {
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
      };

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

      var promise = new Promise(function (resolve, reject) {
        var request = createCORSRequest(options.method, options.url);

        if (options && options.headers) {
          Object.keys(options.headers).forEach(function (key) {
            request.setRequestHeader(key, options.headers[key]);
          });
        }

        if (options.withCredentials) {
          request.withCredentials = true;
        }

        request.onload = function () {
          if (request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(new Error("Status code was " + request.status));
          }
        };
        request.onerror = function () {
          reject(new Error("Can't XHR " + JSON.stringify(options.url)));
        };

        if (options.timeout > 0) {
          var timeout = setTimeout(function () {
            xhr.onreadystatechange = function () {};
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
    value: function put() {
      options.method = 'PUT';
      options.url = url;

      return this.init(options);
    }
  }, {
    key: "delete",
    value: function _delete() {
      options.method = 'DELETE';
      options.url = url;

      return this.init(options);
    }
  }, {
    key: "head",
    value: function head() {
      options.method = 'HEAD';
      options.url = url;

      return this.init(options);
    }
  }, {
    key: "trace",
    value: function trace() {
      options.method = 'TRACE';
      options.url = url;

      return this.init(options);
    }
  }, {
    key: "options",
    value: (function (_options) {
      function options() {
        return _options.apply(this, arguments);
      }

      options.toString = function () {
        return _options.toString();
      };

      return options;
    })(function () {
      options.method = 'OPTIONS';
      options.url = url;

      return this.init(options);
    })
  }, {
    key: "patch",
    value: function patch() {
      options.method = 'PATCH';
      options.url = url;

      return this.init(options);
    }
  }]);

  return HTTP;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json = Json;
exports.JsonProperty = JsonProperty;
exports.JsonIgnore = JsonIgnore;
exports.JsonIgnoreProperties = JsonIgnoreProperties;
exports.JsonPropertyOrder = JsonPropertyOrder;

var _Filter = require('core/filters/Filter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonFilter = (0, _Filter.Filter)(_class = (function () {
  function JsonFilter() {
    _classCallCheck(this, JsonFilter);
  }

  _createClass(JsonFilter, [{
    key: 'render',
    value: function render(value, extra) {
      return JSON.stringify(value, null, ' ');
    }
  }]);

  return JsonFilter;
})()) || _class;

function Json(target) {
  target.fromJson = function (json) {
    var instance = new this();

    Object.keys(json).forEach(function (property) {
      instance[property] = json[property];
    });

    return instance;
  };

  Object.assign(target.prototype, {
    toJson: function toJson() {
      var json = this;

      if (!!this.jsonIgnoredProperties) {
        this.jsonIgnoredProperties.forEach(function (property) {
          delete json[property];
        });
      }

      if (!!this.jsonProperties) {
        this.jsonProperties.forEach(function (property) {
          if (!json.hasOwnProperty(property)) {
            delete json[property];
          }
        });
      }

      //
      // Apply property mappers
      //
      /*
      target.prototype.jsonProperties.filter((property) => {
        return property.hasOwnProperty('conf');
      }).forEach((property) => {
        console.log(property.key, property.conf, json[property.key]);
        json[property.key] = json[property.key]
      });
      */

      var originalProperties = Object.keys(this),
          propertiesOrder = this.jsonPropertiesOrder;

      var newOrder = propertiesOrder.concat(originalProperties).filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });

      var outputJson = {};
      newOrder.forEach(function (property) {
        outputJson[property] = json[property];
      });

      return JSON.stringify(outputJson, null, '');
    }
  });
}

function JsonProperty(target, key) {
  if (!target.jsonProperties) {
    target.jsonProperties = [key];
  } else {
    if (!target.jsonProperties[key]) {
      target.jsonProperties.push(key);
    }
  }
}

function JsonIgnore(target, key) {
  if (!target.jsonIgnoredProperties) {
    target.jsonIgnoredProperties = [key];
  } else {
    if (!target.jsonIgnoredProperties[key]) {
      target.jsonIgnoredProperties.push(key);
    }
  }
}

function JsonIgnoreProperties() {
  for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
    properties[_key] = arguments[_key];
  }

  return function decorator(target) {
    if (!target.prototype.jsonIgnoredProperties) {
      target.prototype.jsonIgnoredProperties = [];
    }

    properties.forEach(function (property) {
      target.prototype.jsonIgnoredProperties.push(property);
    });
  };
}

function JsonPropertyOrder() {
  for (var _len2 = arguments.length, properties = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    properties[_key2] = arguments[_key2];
  }

  return function decorator(target) {
    target.prototype.jsonPropertiesOrder = properties;
  };
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Async = Async;

var _util = require('../util/util');

var _WorkerMock = require('../mocks/WorkerMock');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function isNode() {
  return 'object' === (typeof process === 'undefined' ? 'undefined' : _typeof(process)) && Object.prototype.toString.call(process) === '[object process]';
}

function hasWorkerSupport() {
  return typeof window.Worker !== 'undefined' && typeof window.Blob !== 'undefined' && typeof window.URL.createObjectURL == 'function';
}

function Async(target) {
  var _execute = (0, _util.cloneFunc)(target.prototype.execute);

  Object.assign(target.prototype, {
    execute: function execute() {
      var args = [].slice.call(arguments);
      var worker;

      if (isNode()) {
        worker = new _WorkerMock.WorkerMock(_execute);
      } else {
        if (hasWorkerSupport()) {
          var code = "var command = " + _execute.toString() + ";";
          code += "onmessage = function(e) { var result = command.apply(command, e.data.args); postMessage(result); self.close(); }";

          worker = new Worker(window.URL.createObjectURL(new Blob([code])));
        } else {
          throw new Error('Do not support workers');
        }
      }

      return new Promise(function (resolve) {
        worker.addEventListener('message', function (e) {
          resolve(e.data);
        }, false);
        worker.postMessage({
          args: args
        });
      });
    }
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;

var _util = require('../util/util');

var _DataComponents = require('../component/DataComponents');

(0, _util.log)('Component.js');

function Component(value) {
  return function decorator(target) {
    _DataComponents.DataComponents.add(target.name, target, value);
  };
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Components = undefined;

var _dom = require('../dom/dom');

var _Views = require('../view/Views');

var _util = require('../util/util');

var _DataComponents = require('./DataComponents');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Components = exports.Components = (function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, null, [{
    key: 'components',
    value: function components() {
      return _DataComponents.DataComponents.data;
    }
  }, {
    key: 'normalize',
    value: function normalize(element) {
      return _DataComponents.DataComponents.normalize(element.nodeName);
    }
  }, {
    key: 'exists',
    value: function exists(name) {
      return !!_DataComponents.DataComponents.get(name);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return _DataComponents.DataComponents.get(name);
    }
  }, {
    key: 'parse',
    value: function parse(node, component) {
      _Views.Views.parse(node, component);
    }
  }, {
    key: 'run',
    value: function run(element) {
      if (!!element) {
        _dom.DOM.parse(element);
      } else {
        document.addEventListener("DOMContentLoaded", function (event) {
          _dom.DOM.parse(event.target.body);
        });
      }
    }
  }]);

  return Components;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataComponents = undefined;

var _util = require('../util/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataComponents = exports.DataComponents = (_temp = _class = (function () {
  function DataComponents() {
    _classCallCheck(this, DataComponents);
  }

  _createClass(DataComponents, null, [{
    key: 'normalize',
    value: function normalize(name) {
      var _context;

      return (_context = name.toLowerCase().replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
      }), _util.ucfirst).call(_context);
    }
  }, {
    key: 'add',
    value: function add(name, component, config) {
      DataComponents.data[name] = {
        target: component,
        config: config
      };
    }
  }, {
    key: 'get',
    value: function get(name) {
      return DataComponents.data[name];
    }
  }]);

  return DataComponents;
})(), _class.data = {}, _temp);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inject = Inject;

var _util = require('../util/util');

(0, _util.log)('Inject.js');

function InjectHandlerDescriptor(target, values) {
  target.dependencies = values;
}

function Inject() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _util.decorate)(InjectHandlerDescriptor, args);
}
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Injector = exports.Injector = (_temp = _class = (function () {
  function Injector() {
    _classCallCheck(this, Injector);
  }

  _createClass(Injector, null, [{
    key: "hasInstance",
    value: function hasInstance(name) {
      return !!Injector.instances.hasOwnProperty(name);
    }
  }, {
    key: "instantiate",
    value: function instantiate(target) {
      var instance = undefined;

      if (!!Injector.hasInstance(target.name)) {
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
        dependencies = target.dependencies.map(function (target) {
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
  }]);

  return Injector;
})(), _class.instances = {}, _temp);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataDirectives = undefined;

var _Injector = require("../di/Injector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataDirectives = exports.DataDirectives = (_temp = _class = (function () {
  function DataDirectives() {
    _classCallCheck(this, DataDirectives);
  }

  _createClass(DataDirectives, null, [{
    key: "normalize",
    value: function normalize(name) {
      name = name.charAt(0).toLowerCase() + name.slice(1);
      return name.replace(/([A-Z])/g, function ($1) {
        return "-" + $1.toLowerCase();
      });
    }
  }, {
    key: "add",
    value: function add(name, directive, config) {
      DataDirectives.data[DataDirectives.normalize(name)] = {
        target: directive,
        instance: _Injector.Injector.get(directive),
        config: config
      };
    }
  }, {
    key: "get",
    value: function get(name) {
      return DataDirectives.data[name];
    }
  }]);

  return DataDirectives;
})(), _class.data = {}, _temp);
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFor = undefined;

var _Render = require('../render/Render');

var _Directive = require('./Directive');

var _Directives = require('./Directives');

var _dom = require('../dom/dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataFor = exports.DataFor = (_dec = (0, _Directive.Directive)({
  name: 'data-for'
}), _dec(_class = (function () {
  function DataFor() {
    _classCallCheck(this, DataFor);
  }

  _createClass(DataFor, [{
    key: 'render',
    value: function render(element, data, value, config) {
      var originalClone = element.cloneNode(true);
      var parentNode = element.parentNode;
      parentNode.removeChild(element);

      var _value$match = value.match(/([$a-zA-Z0-9]+)/g);

      var _value$match2 = _slicedToArray(_value$match, 6);

      var iterator = _value$match2[0];
      var list = _value$match2[2];
      var trackBy = _value$match2[5];

      data[list].forEach(function (item, index) {
        var contextData = {};
        contextData[iterator] = item;

        if (!!trackBy) {
          contextData[trackBy] = index;
        }

        var child = originalClone.cloneNode(true);
        child.removeAttribute(config.name);

        var childParsed = _Directives.Directives.parseElement(child, contextData);
        var wrapper = document.createElement('div');
        wrapper.innerHTML = _Render.Render.render(childParsed.outerHTML, contextData);

        parentNode.appendChild(wrapper.firstChild);

        _dom.DOM.parse(parentNode).walk(parentNode, function (element) {
          if (element.nodeType === 1) {
            if (!element.contextData) {
              element.contextData = contextData;
            }
          }
        });
      });
    }
  }]);

  return DataFor;
})()) || _class);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataIf = undefined;

var _Inject = require('../di/Inject');

var _Directive = require('./Directive');

var _Evaluator = require('../evaluator/Evaluator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataIf = exports.DataIf = (_dec = (0, _Directive.Directive)({
  name: 'data-if'
}), _dec2 = (0, _Inject.Inject)(_Evaluator.Evaluator), _dec(_class = _dec2(_class = (function () {
  function DataIf(evaluator) {
    _classCallCheck(this, DataIf);

    this.evaluator = evaluator;
  }

  _createClass(DataIf, [{
    key: 'render',
    value: function render(element, data, value) {
      if (!this.evaluator.eval(data, value)) {
        element.parentNode.removeChild(element);
      }
    }
  }]);

  return DataIf;
})()) || _class) || _class);
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataClass = undefined;

var _Inject = require('../di/Inject');

var _Directive = require('./Directive');

var _Evaluator = require('../evaluator/Evaluator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataClass = exports.DataClass = (_dec = (0, _Directive.Directive)({
  name: 'data-class'
}), _dec2 = (0, _Inject.Inject)(_Evaluator.Evaluator), _dec(_class = _dec2(_class = (function () {
  function DataClass(evaluator) {
    _classCallCheck(this, DataClass);

    this.evaluator = evaluator;
  }

  _createClass(DataClass, [{
    key: 'render',
    value: function render(element, data, value) {
      var _this = this;

      var classNames = value.split(',');

      classNames.forEach(function (className) {
        var _className$split = className.split(':');

        var _className$split2 = _slicedToArray(_className$split, 2);

        var elementClassName = _className$split2[0];
        var elementValue = _className$split2[1];

        elementClassName = elementClassName.trim().replace(/'/gm, "");

        if (_this.evaluator.eval(data, elementValue)) {
          element.classList.add(elementClassName);
        } else {
          element.classList.remove(elementClassName);
        }
      });
    }
  }]);

  return DataClass;
})()) || _class) || _class);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataModel = undefined;

var _util = require('../util/util');

var _Injector = require('../di/Injector');

var _EventBus = require('../event/EventBus');

var _EventNameNormalizer = require('../event/EventNameNormalizer');

var _Views = require('../view/Views');

var _Directive = require('./Directive');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataModel = exports.DataModel = (_dec = (0, _Directive.Directive)({
  name: 'data-model'
}), _dec(_class = (function () {
  function DataModel() {
    _classCallCheck(this, DataModel);
  }

  _createClass(DataModel, [{
    key: 'render',
    value: function render(element, data, value, config, target) {
      var eventName = _EventNameNormalizer.EventNameNormalizer.normalize(target, _EventBus.EventBus.MODEL_CHANGE_DETECTED);

      var instance = _Injector.Injector.instances[target.name];

      var bValue = null;
      Object.defineProperty(instance, value, {
        get: function get() {
          return bValue;
        },
        set: function set(newValue) {
          bValue = newValue;

          var data = {};
          data[value] = newValue;

          _EventBus.EventBus.publish(eventName, data);
        },
        enumerable: true,
        configurable: true
      });

      instance[value] = element.value;

      _EventBus.EventBus.subscribe(eventName, function (e, data) {
        var _context;

        var key = (_context = Object.keys(data), _util.first).call(_context);
        _Views.Views.parseModel(key, target);
      });
    }
  }]);

  return DataModel;
})()) || _class);
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataStyle = undefined;

var _Inject = require('../di/Inject');

var _Directive = require('./Directive');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataStyle = exports.DataStyle = (_dec = (0, _Directive.Directive)({
  name: 'data-style'
}), _dec(_class = (function () {
  function DataStyle() {
    _classCallCheck(this, DataStyle);
  }

  _createClass(DataStyle, [{
    key: 'render',
    value: function render(element, data, value) {
      var styles = value.split(',');

      styles.forEach(function (style) {
        var _style$split = style.split(':');

        var _style$split2 = _slicedToArray(_style$split, 2);

        var elementStyle = _style$split2[0];
        var elementValue = _style$split2[1];

        elementStyle = elementStyle.trim().replace(/'/gm, "");

        element.style[elementStyle.trim()] = data[elementValue.trim()];
      });
    }
  }]);

  return DataStyle;
})()) || _class);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Directive = Directive;

var _util = require('../util/util');

var _DataDirectives = require('./DataDirectives');

(0, _util.log)('Directive.js');

function Directive(value) {
  return function decorator(target) {
    _DataDirectives.DataDirectives.add(target.name, target, value);
  };
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Directives = undefined;

var _DataDirectives = require('./DataDirectives');

var _Components = require('../component/Components');

var _dom = require('../dom/dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directives = exports.Directives = (function () {
  function Directives() {
    _classCallCheck(this, Directives);
  }

  _createClass(Directives, null, [{
    key: 'has',
    value: function has(name) {
      return !!_DataDirectives.DataDirectives.get(name);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return _DataDirectives.DataDirectives.get(name);
    }
  }, {
    key: 'getDirectives',
    value: function getDirectives() {
      return _DataDirectives.DataDirectives.data;
    }
  }, {
    key: 'parseElement',
    value: function parseElement(element, data) {
      if (!!element.hasAttributes()) {
        var directives = _dom.DOM.attrs(element).filter(function (attr) {
          return Directives.has(attr.name);
        }).map(function (attr) {
          return {
            directive: Directives.get(attr.name),
            value: attr.value
          };
        });

        Directives.render(element, directives, data);
      }

      return element;
    }
  }, {
    key: 'parse',
    value: function parse(node, data, target) {
      var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter(function (element) {
        return element.nodeType === 1;
      });

      childNodes.forEach(function (element) {
        if (!!element.hasAttributes()) {
          var directives = _dom.DOM.attrs(element).filter(function (attr) {
            return Directives.has(attr.name);
          }).map(function (attr) {
            return {
              directive: Directives.get(attr.name),
              value: attr.value,
              target: target
            };
          });

          Directives.render(element, directives, data);
        }
      });

      return node;
    }
  }, {
    key: 'render',
    value: function render(element, directives, data) {
      directives.forEach(function (input) {
        var directive = input.directive;
        var value = input.value;
        var target = input.target;

        directive.instance.render(element, data, value, directive.config, target);
      });
    }
  }]);

  return Directives;
})();

Directives.PREFIX = "data-";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTMLParser = HTMLParser;
exports.HTMLtoXML = HTMLtoXML;
exports.HTMLtoDOM = HTMLtoDOM;
/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * HTMLParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * // or to get an XML string:
 * HTMLtoXML(htmlString);
 *
 * // or to get an XML DOM Document
 * HTMLtoDOM(htmlString);
 *
 * // or to inject into an existing document/DOM node
 * HTMLtoDOM(htmlString, document);
 * HTMLtoDOM(htmlString, document.body);
 *
 */

function makeMap(str) {
  var obj = {},
      items = str.split(",");
  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }return obj;
}

// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("script,style");

function HTMLParser(html, handler) {
  var index,
      chars,
      match,
      stack = [],
      last = html;
  stack.last = function () {
    return this[this.length - 1];
  };

  while (html) {
    chars = true;

    // Make sure we're not in a script or style element
    if (!stack.last() || !special[stack.last()]) {

      // Comment
      if (html.indexOf("<!--") == 0) {
        index = html.indexOf("-->");

        if (index >= 0) {
          if (handler.comment) handler.comment(html.substring(4, index));
          html = html.substring(index + 3);
          chars = false;
        }

        // end tag
      } else if (html.indexOf("</") == 0) {
          match = html.match(endTag);

          if (match) {
            html = html.substring(match[0].length);
            match[0].replace(endTag, parseEndTag);
            chars = false;
          }

          // start tag
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

        if (handler.chars) handler.chars(text);
      }
    } else {
      html = html.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), function (all, text) {
        text = text.replace(/<!--(.*?)-->/g, "$1").replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

        if (handler.chars) handler.chars(text);

        return "";
      });

      parseEndTag("", stack.last());
    }

    if (html == last) throw "Parse Error: " + html;
    last = html;
  }

  // Clean up any remaining tags
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

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
        });
      });

      if (handler.start) handler.start(tagName, attrs, unary);
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) var pos = 0;

    // Find the closest opened tag of the same type
    else for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] == tagName) break;
      }if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (handler.end) handler.end(stack[i]);
      } // Remove the open elements from the stack
      stack.length = pos;
    }
  }
}

function HTMLtoXML(html) {
  var results = "";

  HTMLParser(html, {
    start: function start(tag, attrs, unary) {
      results += "<" + tag;

      for (var i = 0; i < attrs.length; i++) {
        results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
      }results += (unary ? "/" : "") + ">";
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
  // There can be only one of these elements
  var one = makeMap("html,head,body,title");

  // Enforce a structure for the document
  var structure = {
    link: "head",
    base: "head"
  };

  if (!doc) {
    if (typeof DOMDocument != "undefined") doc = new DOMDocument();else if (typeof document != "undefined" && document.implementation && document.implementation.createDocument) doc = document.implementation.createDocument("", "", null);else if (typeof ActiveX != "undefined") doc = new ActiveXObject("Msxml.DOMDocument");
  } else doc = doc.ownerDocument || doc.getOwnerDocument && doc.getOwnerDocument() || doc;

  var elems = [],
      documentElement = doc.documentElement || doc.getDocumentElement && doc.getDocumentElement();

  // If we're dealing with an empty document then we
  // need to pre-populate it with the HTML document structure
  if (!documentElement && doc.createElement) (function () {
    var html = doc.createElement("html");
    var head = doc.createElement("head");
    head.appendChild(doc.createElement("title"));
    html.appendChild(head);
    html.appendChild(doc.createElement("body"));
    doc.appendChild(html);
  })();

  // Find all the unique elements
  if (doc.getElementsByTagName) for (var i in one) {
    one[i] = doc.getElementsByTagName(i)[0];
  } // If we're working with a document, inject contents into
  // the body element
  var curParentNode = one.body;

  HTMLParser(html, {
    start: function start(tagName, attrs, unary) {
      // If it's a pre-built element, then we can ignore
      // its construction
      if (one[tagName]) {
        curParentNode = one[tagName];
        if (!unary) {
          elems.push(curParentNode);
        }
        return;
      }

      var elem = doc.createElement(tagName);

      for (var attr in attrs) {
        elem.setAttribute(attrs[attr].name, attrs[attr].value);
      }if (structure[tagName] && typeof one[structure[tagName]] != "boolean") one[structure[tagName]].appendChild(elem);else if (curParentNode && curParentNode.appendChild) curParentNode.appendChild(elem);

      if (!unary) {
        elems.push(elem);
        curParentNode = elem;
      }
    },
    end: function end(tag) {
      elems.length -= 1;

      // Init the new parentNode
      curParentNode = elems[elems.length - 1];
    },
    chars: function chars(text) {
      curParentNode.appendChild(doc.createTextNode(text));
    },
    comment: function comment(text) {
      // create comment node
    }
  });

  return doc;
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOM = undefined;

var _Components = require('../component/Components');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOM = exports.DOM = (_temp = _class = (function () {
  function DOM() {
    _classCallCheck(this, DOM);
  }

  _createClass(DOM, null, [{
    key: 'attrs',
    value: function attrs(node) {
      if (!!node) {
        var nodeAttrs = Array.prototype.slice.call(node.attributes);

        return nodeAttrs.map(function (attribute) {
          return {
            name: attribute.name,
            value: attribute.value,
            escaped: attribute.value.replace(/(^|[^\\])"/g, '$1\\\"')
          };
        });
      }
    }
  }, {
    key: 'walk',
    value: function walk(node, callback) {
      if (!!node) {
        do {
          callback(node);

          if (!!node && node.hasChildNodes()) {
            DOM.walk(node.firstChild, callback);
          }
        } while (node = node.nextSibling);
      }

      return DOM;
    }
  }, {
    key: 'clean',
    value: function clean(node) {
      if (!!node) {
        for (var n = 0; n < node.childNodes.length; n++) {
          var child = node.childNodes[n];
          if (child.nodeType === 8 || child.nodeType === 3 && !/\S/.test(child.nodeValue)) {
            node.removeChild(child);
            n--;
          } else if (child.nodeType === 1) {
            DOM.clean(child);
          }
        }
      }

      return DOM;
    }
  }, {
    key: 'childs',
    value: function childs(node) {
      var childNodes = [];

      if (!!node) {
        DOM.walk(node, function (n) {
          childNodes.push(n);
        });
        childNodes.shift();
      }

      return childNodes;
    }
  }, {
    key: 'parse',
    value: function parse(node) {
      if (!!node) {
        var childNodes = DOM.childs(node);

        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }

        childNodes.forEach(function (element) {
          var componentName = _Components.Components.normalize(element);

          if (!!_Components.Components.exists(componentName)) {
            if (!!Injector.hasInstance(componentName)) {
              if (element.parentNode) {
                element.parentNode.appendChild(element);
              } else {
                node.appendChild(element);
              }

              //let attrs = !!element.hasAttributes() ? DOM.attrs(element) : [];
              _Components.Components.parse(element, _Components.Components.get(componentName));
            } else {
              throw new Error('Error, no instance for component: ' + componentName);
            }
          } else {
            if (element.parentNode) {
              element.parentNode.appendChild(element);
            } else {
              node.appendChild(element);
            }
          }
        });
      }

      return DOM;
    }
  }, {
    key: 'fragment',
    value: function fragment(node) {
      var domFragment = document.createDocumentFragment();

      if (!!node) {
        while (node.firstChild) {
          domFragment.appendChild(node.firstChild);
        }
      }

      return domFragment;
    }
  }]);

  return DOM;
})(), _class.cache = [], _temp);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evaluator = exports.Evaluator = (function () {
  function Evaluator() {
    _classCallCheck(this, Evaluator);
  }

  _createClass(Evaluator, [{
    key: 'eval',
    value: function _eval(data, code) {
      var args = Object.keys(data),
          values = args.map(function (value) {
        return data[value];
      });

      var executor = new Function(args, 'return ' + code);
      return executor.apply(executor, values);
    }
  }]);

  return Evaluator;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventBinder = undefined;

var _Injector = require('../di/Injector');

var _EventBus = require('../event/EventBus');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function setPrimitive(value) {
  if (!isNaN(value)) {
    // check integer
    if (/[0-9]+/.test(value)) {
      return parseInt(value, 10);
    }

    // check float
    if (/^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(value)) {
      return parseFloat(value);
    }
  }

  return value;
}

var EventBinder = exports.EventBinder = (_temp = _class = (function () {
  function EventBinder() {
    _classCallCheck(this, EventBinder);
  }

  _createClass(EventBinder, null, [{
    key: 'bindInstance',
    value: function bindInstance(element, attrs, instance) {
      if (attrs.length > 0) {
        attrs.forEach(function (attr) {
          var attrName = attr.name,
              attrValue = attr.value;

          if (attrName.charAt(0) === '_') {
            var eventName = attrName.substring(1);

            element.addEventListener(eventName, function () {
              var data = element.contextData;
              var methodName = attrValue.match(/^(.*)\(/mi)[1];
              var args = attrValue.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
              args = args.length > 0 ? args.split(/,/) : [];
              args = args.map(function (arg) {
                return setPrimitive(arg);
              });

              if (!!data) {
                args = args.map(function (arg) {
                  if (!!data.hasOwnProperty(arg)) {
                    arg = data[arg];
                  }

                  return arg;
                });
              }

              instance[methodName].apply(instance, args);
            }, false);
          }

          if (attrName === 'data-model') {
            element.addEventListener('input', function () {
              instance[attrValue] = element.value;
            }, false);
          }
        });
      }
    }
  }, {
    key: 'bind',
    value: function bind(element, attrs, target) {
      if (attrs.length > 0) {
        var instance = _Injector.Injector.instances[target.name];
        EventBinder.bindInstance(element, attrs, instance);
      }
    }
  }]);

  return EventBinder;
})(), _class.DataCache = {}, _temp);
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = exports.EventBus = (_temp = _class = (function () {
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

      EventBus.topics[topic].push({ token: token, callback: callback });

      return token;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(token) {
      for (var m in EventBus.topics) {
        if (EventBus.topics.hasOwnProperty(m)) {
          for (var i = 0, j = EventBus.topics[m].length; i < j; i++) {
            if (EventBus.topics[m][i].token === token) {
              EventBus.topics[m].splice(i, 1);
              return token;
            }
          }

          delete EventBus.topics[m];
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
          return function () {
            throw e;
          };
        };

        for (var i = 0, j = subscribers.length; i < j; i++) {
          try {
            subscribers[i].callback(topic, data);
          } catch (e) {
            setTimeout(throwException(e), 0);
          }
        }
      }

      notify();

      return true;
    }
  }]);

  return EventBus;
})(), _class.topics = {}, _class.lastUid = -1, _temp);

EventBus.CHANGE_DETECTED = "CHANGE_DETECTED";
EventBus.MODEL_CHANGE_DETECTED = "MODEL_CHANGE_DETECTED";
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventNameNormalizer = exports.EventNameNormalizer = (function () {
  function EventNameNormalizer() {
    _classCallCheck(this, EventNameNormalizer);
  }

  _createClass(EventNameNormalizer, null, [{
    key: 'normalize',
    value: function normalize(target, eventName) {
      if (!!target && !!target.name) {
        return target.name.toUpperCase() + '_' + eventName;
      }
    }
  }]);

  return EventNameNormalizer;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFilters = undefined;

var _Injector = require('../di/Injector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function normalizeFilterName(name) {
  return name.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

var DataFilters = exports.DataFilters = (_temp = _class = (function () {
  function DataFilters() {
    _classCallCheck(this, DataFilters);
  }

  _createClass(DataFilters, null, [{
    key: 'add',
    value: function add(name, filter) {
      DataFilters.data[normalizeFilterName(name)] = _Injector.Injector.get(filter);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return DataFilters.data[name];
    }
  }]);

  return DataFilters;
})(), _class.data = {}, _temp);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = Filter;

var _util = require('../util/util');

var _DataFilters = require('DataFilters');

(0, _util.log)('Filter.js');

function Filter(target) {
  _DataFilters.DataFilters.add(target.name, target);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filters = undefined;

var _DataFilters = require('./DataFilters');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = exports.Filters = (function () {
  function Filters() {
    _classCallCheck(this, Filters);
  }

  _createClass(Filters, null, [{
    key: 'get',
    value: function get(name) {
      return _DataFilters.DataFilters.get(name);
    }
  }, {
    key: 'getFilters',
    value: function getFilters() {
      return _DataFilters.DataFilters.data;
    }
  }]);

  return Filters;
})();
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataI18n = undefined;

var _Inject = require('../di/Inject');

var _Directive = require('../directives/Directive');

var _i18nConfig = require('./i18nConfig');

var _i18n = require('./i18n');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataI18n = exports.DataI18n = (_dec = (0, _Directive.Directive)({
  name: 'data-i18n'
}), _dec(_class = (function () {
  function DataI18n() {
    _classCallCheck(this, DataI18n);
  }

  _createClass(DataI18n, [{
    key: 'render',
    value: function render(element, data, value) {
      var i18nLabel = element.dataset.i18n,
          i18nValue = element.dataset.i18nValue;

      if (!!i18nValue) {
        i18nValue = JSON.parse(i18nValue);
      }

      if (!!data && !!value) {
        i18nValue = "LT";

        if (value.indexOf('|') > -1) {
          var _value$split$map = value.split('|').map(function (s) {
            return s.trim();
          });

          var _value$split$map2 = _slicedToArray(_value$split$map, 2);

          var v = _value$split$map2[0];
          var f = _value$split$map2[1];

          i18nLabel = data[v] ? data[v] : i18nLabel;
          i18nValue = f;
        } else {
          i18nLabel = data[value] ? data[value] : i18nLabel;
        }
      }

      element.appendChild(document.createTextNode(_i18n.i18n.from(i18nLabel, _i18n.i18n.getConfig()).format(i18nValue)));
    }
  }]);

  return DataI18n;
})()) || _class);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = undefined;

var _i18nDate = require('./i18nDate');

var _i18nNumber = require('./i18nNumber');

var _i18nTranslate = require('./i18nTranslate');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var i18n = exports.i18n = (_temp = _class = (function () {
  _createClass(i18n, null, [{
    key: 'from',
    value: function from(input, config) {
      return new i18n(input, config);
    }
  }]);

  function i18n(input, config) {
    _classCallCheck(this, i18n);

    this.input = input;
    this.config = config;
  }

  _createClass(i18n, [{
    key: 'isDate',
    value: function isDate(input) {
      return input instanceof Date;
    }
  }, {
    key: 'isNumber',
    value: function isNumber(input) {
      return typeof input === 'number';
    }
  }, {
    key: 'isString',
    value: function isString(input) {
      return typeof input === 'string';
    }
  }, {
    key: 'locale',
    value: function locale(input) {
      return input.replace('-', '_');
    }
  }, {
    key: 'format',
    value: function format(opts) {
      if (!!this.isDate(this.input)) {
        var options = _i18nDate.i18nDate.fromFormat(opts, this.config);

        return this.input.toLocaleString(this.config.locale, options);
      }

      if (!!this.isNumber(this.input)) {
        var options = _i18nNumber.i18nNumber.fromFormat(opts, this.config);

        if (opts === _i18nNumber.i18nNumber.PERCENT) {
          this.input /= 100;
        }

        return this.input.toLocaleString(this.config.locale, options);
      }

      if (!!this.isString(this.input)) {
        var map = this.config.translations[this.locale(this.config.locale)];
        return _i18nTranslate.i18nTranslate.from(map, this.input).translate(opts);
      }
    }
  }], [{
    key: 'getConfig',
    value: function getConfig() {
      return i18n.configs;
    }
  }, {
    key: 'setConfig',
    value: function setConfig(key, value) {
      i18n.configs[key] = value;
    }
  }]);

  return i18n;
})(), _class.configs = null, _temp);

i18n.TRANSLATION_LOADED = 'TRANSLATION_LOADED';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18nConfig = i18nConfig;

var _util = require('../util/util');

var _i18n = require('./i18n');

var _HTTP = require('../../http/HTTP');

var _EventBus = require('../event/EventBus');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function i18nConfigHandlerDescriptor(target, value) {
  if (value.hasOwnProperty('loader')) {
    (function () {
      var locale = value.locale.replace('-', '_');

      _HTTP.HTTP.get(value.loader).then(function (translations) {
        value.translations = {};
        value.translations[locale] = (typeof translations === 'undefined' ? 'undefined' : _typeof(translations)) === 'object' ? translations : JSON.parse(translations);

        _i18n.i18n.configs = value;
        _EventBus.EventBus.publish(_i18n.i18n.TRANSLATION_LOADED);
      });
    })();
  } else {
    _i18n.i18n.configs = value;
    _EventBus.EventBus.publish(_i18n.i18n.TRANSLATION_LOADED);
  }
}

function i18nConfig(arg) {
  return (0, _util.decorate)(i18nConfigHandlerDescriptor, arg);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18nDate = undefined;

var _util = require('../util/util');

var _i18nDateFormatter = require('./i18nDateFormatter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var i18nDate = exports.i18nDate = (function () {
  function i18nDate() {
    _classCallCheck(this, i18nDate);
  }

  _createClass(i18nDate, null, [{
    key: 'fromFormat',

    /**
     * Formats
     *
     * LT   -> 8:30 PM
     * LTS  -> 8:30:25 PM
     * L    -> 09/04/1986
     * l    -> 9/4/1986
     * LL   -> September 4 1986
     * ll   -> Sep 4 1986
     * LLL  -> September 4 1986 8:30 PM
     * lll  -> Sep 4 1986 8:30 PM
     * LLLL -> Thursday, September 4 1986 8:30 PM
     * llll -> Thu, Sep 4 1986 8:30 PM
     */

    value: function fromFormat(format, config) {
      var options = {};

      if (!!config.timezone) {
        options.timeZone = config.timezone;
      }

      options.hour12 = !!options.hour12;

      if (!!format) {
        return i18nDate.createFromFormat(format, options);
      } else {
        return options;
      }
    }
  }, {
    key: 'createFromFormat',
    value: function createFromFormat(format, options) {
      var outputOptions = JSON.parse(JSON.stringify(options));
      var dateOptions = _i18nDateFormatter.i18nDateFormatter.from(format).getOptions();

      return (0, _util.merge)(outputOptions, dateOptions);
    }
  }]);

  return i18nDate;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // Time
// TimeSeconds
// MonthDayYearNumeric
// MonthDayYear2Digit
// MonthNameDayMonthYear
// MonthNameShortDayMonthYear
// MonthNameDayMonthYearTime
// MonthNameShortDayMonthYearTime
// DayOfWeekMonthNameDayYearTime

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18nDateFormatter = undefined;

var _Time = require('./date/Time');

var _TimeSeconds = require('./date/TimeSeconds');

var _MonthDayYearNumeric = require('./date/MonthDayYearNumeric');

var _MonthDayYear2Digit = require('./date/MonthDayYear2Digit');

var _MonthNameDayMonthYear = require('./date/MonthNameDayMonthYear');

var _MonthNameShortDayMonthYear = require('./date/MonthNameShortDayMonthYear');

var _MonthNameDayMonthYearTime = require('./date/MonthNameDayMonthYearTime');

var _MonthNameShortDayMonthYearTime = require('./date/MonthNameShortDayMonthYearTime');

var _DayOfWeekMonthNameDayYearTime = require('./date/DayOfWeekMonthNameDayYearTime');

var _DayOfWeekShortMonthNameShortDayYearTime = require('./date/DayOfWeekShortMonthNameShortDayYearTime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DayOfWeekShortMonthNameShortDayYearTime

var i18nDateFormatter = exports.i18nDateFormatter = (function () {
  function i18nDateFormatter() {
    _classCallCheck(this, i18nDateFormatter);
  }

  _createClass(i18nDateFormatter, null, [{
    key: 'from',
    value: function from(format) {
      if (format === 'LT') {
        return new _Time.LT();
      }

      if (format === 'LTS') {
        return new _TimeSeconds.LTS();
      }

      if (format === 'L') {
        return new _MonthDayYearNumeric.L();
      }

      if (format === 'l') {
        return new _MonthDayYear2Digit.l();
      }

      if (format === 'LL') {
        return new _MonthNameDayMonthYear.LL();
      }

      if (format === 'll') {
        return new _MonthNameShortDayMonthYear.ll();
      }

      if (format === 'LLL') {
        return new _MonthNameDayMonthYearTime.LLL();
      }

      if (format === 'lll') {
        return new _MonthNameShortDayMonthYearTime.lll();
      }

      if (format === 'LLLL') {
        return new _DayOfWeekMonthNameDayYearTime.LLLL();
      }

      if (format === 'llll') {
        return new _DayOfWeekShortMonthNameShortDayYearTime.llll();
      }
    }
  }]);

  return i18nDateFormatter;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var i18nNumber = exports.i18nNumber = (function () {
  function i18nNumber() {
    _classCallCheck(this, i18nNumber);
  }

  _createClass(i18nNumber, null, [{
    key: 'fromFormat',
    value: function fromFormat(format, config) {
      var options = {
        style: i18nNumber.DECIMAL
      };

      if (format === i18nNumber.CURRENCY) {
        options.style = i18nNumber.CURRENCY;
        options.currency = config.currency;
      }

      if (format === i18nNumber.PERCENT) {
        options.style = i18nNumber.PERCENT;
      }

      return options;
    }
  }]);

  return i18nNumber;
})();

i18nNumber.DECIMAL = 'decimal';
i18nNumber.PERCENT = 'percent';
i18nNumber.CURRENCY = 'currency';
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var i18nTranslate = exports.i18nTranslate = (function () {
  _createClass(i18nTranslate, null, [{
    key: 'from',
    value: function from(map, path) {
      return new i18nTranslate(map, path);
    }
  }]);

  function i18nTranslate(map, path) {
    _classCallCheck(this, i18nTranslate);

    this.map = map;
    this.path = path;
  }

  _createClass(i18nTranslate, [{
    key: 'index',
    value: function index(obj, is, value) {
      if (typeof is == 'string') return this.index(obj, is.split('.'), value);else if (is.length === 1 && value !== undefined) return obj[is[0]] = value;else if (is.length === 0) return obj;else return this.index(obj[is[0]], is.slice(1), value);
    }
  }, {
    key: 'isZero',
    value: function isZero(input) {
      return input === 0;
    }
  }, {
    key: 'isOne',
    value: function isOne(input) {
      return input === 1;
    }
  }, {
    key: 'isGreaterThanOne',
    value: function isGreaterThanOne(input) {
      return input > 1;
    }
  }, {
    key: 'plural',
    value: function plural(value, opts) {
      var output = undefined;

      if (!!this.isZero(value)) {
        var _$exec = /=0 \{(.*?)\}/ig.exec(opts);

        var _$exec2 = _slicedToArray(_$exec, 2);

        var v = _$exec2[1];

        output = v.trim();
      }

      if (!!this.isOne(value)) {
        var _$exec3 = /=1 \{(.*?)\}/ig.exec(opts);

        var _$exec4 = _slicedToArray(_$exec3, 2);

        var v = _$exec4[1];

        output = v.trim();
      }

      if (!!this.isGreaterThanOne(value)) {
        var _$exec5 = /other \{(.*?)\}/ig.exec(opts);

        var _$exec6 = _slicedToArray(_$exec5, 2);

        var v = _$exec6[1];

        output = v.trim().replace('#', value);
      }

      return output;
    }
  }, {
    key: 'isMale',
    value: function isMale(input) {
      return input.toLowerCase() === 'male';
    }
  }, {
    key: 'isFemale',
    value: function isFemale(input) {
      return input.toLowerCase() === 'female';
    }
  }, {
    key: 'gender',
    value: function gender(value, opts) {
      var output = undefined;

      if (!!this.isMale(value)) {
        var _$exec7 = /male \{(.*?)\}/ig.exec(opts);

        var _$exec8 = _slicedToArray(_$exec7, 2);

        var v = _$exec8[1];

        output = v.trim();
      } else if (!!this.isFemale(value)) {
        var _$exec9 = /female \{(.*?)\}/ig.exec(opts);

        var _$exec10 = _slicedToArray(_$exec9, 2);

        var v = _$exec10[1];

        output = v.trim();
      } else {
        var _$exec11 = /other \{(.*?)\}/ig.exec(opts);

        var _$exec12 = _slicedToArray(_$exec11, 2);

        var v = _$exec12[1];

        output = v.trim();
      }

      return output;
    }
  }, {
    key: 'translate',
    value: function translate(values) {
      var value = this.index(this.map, this.path),
          match = undefined,
          re = new RegExp("{{(.*)?}}", "g");

      if (!!values) {
        while (match = re.exec(value)) {
          var _match$1$split = match[1].split(',');

          var _match$1$split2 = _slicedToArray(_match$1$split, 3);

          var variable = _match$1$split2[0];
          var callback = _match$1$split2[1];
          var options = _match$1$split2[2];

          value = this[callback.trim()].call(this, values[variable], options.trim());
        }
      }

      return value;
    }
  }]);

  return i18nTranslate;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkerMock = exports.WorkerMock = (function () {
  function WorkerMock(code) {
    _classCallCheck(this, WorkerMock);

    this.code = code;
  }

  _createClass(WorkerMock, [{
    key: "addEventListener",
    value: function addEventListener(subject, callback) {
      var command = this.code;

      this.callback = function (data) {
        callback({
          data: command.apply(command, data.args)
        });
      };
    }
  }, {
    key: "postMessage",
    value: function postMessage(data) {
      this.callback(data);
    }
  }]);

  return WorkerMock;
})();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Module = Module;

var _util = require('../util/util');

(0, _util.log)('Module.js');

function Module() {}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = undefined;

var _util = require('../util/util');

var _Directives = require('../directives/Directives');

var _Filters = require('../filters/Filters');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = exports.Render = (function () {
  function Render() {
    _classCallCheck(this, Render);
  }

  _createClass(Render, null, [{
    key: 'normalize',
    value: function normalize(html) {
      var coreDirectives = [];
      for (var directive in _Directives.Directives.getDirectives()) {
        //console.log(directive, Directives.get(directive).config);
        coreDirectives.push(directive.replace(_Directives.Directives.PREFIX, ''));
      }

      var pattern = '\\*(' + coreDirectives.join('|') + ')';
      var regExp = new RegExp(pattern, "gm");

      return html.replace(regExp, function (p1, p2) {
        return _Directives.Directives.PREFIX + p2;
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
        if (match[1].indexOf('|') > -1) {
          var _context;

          var filters = match[1].split('|').map(function (filter) {
            return filter.trim();
          });
          var value = filters.shift();

          filters = filters.map(function (name) {
            if (name.indexOf(':') === -1) {
              return {
                filter: _Filters.Filters.get(name).render,
                value: null
              };
            } else {
              var filterValue = name.substring(name.indexOf(':') + 1);
              var _filterName = name.substring(0, name.indexOf(':'));
              return {
                filter: _Filters.Filters.get(_filterName).render,
                value: filterValue
              };
            }
          });

          var filterName = (_context = filters, _util.first).call(_context);

          options['filter'] = filterName.filter;
          options['filterValue'] = filterName.value;

          add(html.slice(cursor, match.index))('this.filter' + '(this.' + value + ', this.filterValue)', true);
        } else {
          add(html.slice(cursor, match.index))('this.' + match[1], true);
        }
        cursor = match.index + match[0].length;
      }

      add(html.substr(cursor, html.length - cursor));
      code += 'return r.join("");';

      //console.log(code);
      //console.log(html);
      //console.log(new Function(code.replace(/[\r\t\n]/g, '')).apply(options));

      return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    }
  }]);

  return Render;
})();

Render.START_DELIMITER = "{{";
Render.END_DELIMITER = "}}";
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _EventBus = require('../event/EventBus');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = exports.Router = (_temp = _class = (function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, null, [{
    key: 'getHash',
    value: function getHash() {
      return window.location.hash.substring(1);
    }
  }, {
    key: 'exists',
    value: function exists() {
      var routes = Router.routes.filter(function (route) {
        var path = route.value.path;

        if (!!path.test(Router.getHash())) {
          return route;
        }
      });

      return routes.length === 1;
    }
  }, {
    key: 'route',
    value: function route() {
      Router.routes.forEach(function (route) {
        var path = route.value.path;

        if (!!path.test(Router.getHash())) {
          _EventBus.EventBus.publish(Router.ROUTE_CHANGED, route);
        }
      });
    }
  }, {
    key: 'routeTo',
    value: function routeTo(route) {
      window.location.hash = route.value.url;
    }
  }, {
    key: 'routeToDefault',
    value: function routeToDefault() {
      Router.routes.forEach(function (route) {
        if (!!route.value.hasOwnProperty('default')) {
          window.location.hash = route.value.url;
        }
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var history = window.location.hash;
      window.location.hash = '#' + +new Date();
      window.location.hash = history;
    }
  }, {
    key: 'run',
    value: function run() {
      if (window.location.hash.length === 0) {
        Router.routeToDefault();
      }

      window.addEventListener('hashchange', Router.route, false);
      window.addEventListener('load', Router.load, false);
    }
  }]);

  return Router;
})(), _class.routes = [], _temp);

Router.ROUTE_CHANGED = "ROUTE_CHANGED";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterConfig = RouterConfig;

var _util = require('../util/util');

var _Router = require('./Router');

(0, _util.log)('RouterConfig.js');

function pathToRegexp(path, keys, sensitive, strict) {
  if (path instanceof RegExp) return path;
  if (path instanceof Array) path = '(' + path.join('|') + ')';
  path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
    keys.push({ name: key, optional: !!optional });
    slash = slash || '';
    return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || format && '([^/.]+?)' || '([^/]+?)') + ')' + (optional || '');
  }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');

  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}

function RouterConfigHandlerDescriptor(target, value) {
  value.url = value.path;
  value.path = pathToRegexp(value.path, [], false, false);
  _Router.Router.routes.push({ target: target, value: value });
}

function RouterConfig(arg) {
  return (0, _util.decorate)(RouterConfigHandlerDescriptor, arg);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterContent = undefined;

var _util = require('../util/util');

var _EventBus = require('../event/EventBus');

var _Router = require('./Router');

var _Component = require('../component/Component');

var _View = require('../view/View');

var _Views = require('../view/Views');

var _Injector = require('../di/Injector');

var _Bindable = require('../view/Bindable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _util.log)('RouterContent.js');

var ROUTER_CONTENT_UUID = (0, _util.guid)();

var RouterContent = exports.RouterContent = (_dec = (0, _Component.Component)({
  name: 'router-content'
}), _dec2 = (0, _View.View)({
  template: '<div id="' + ROUTER_CONTENT_UUID + '"></div>'
}), _dec(_class = _dec2(_class = (function () {
  function RouterContent() {
    _classCallCheck(this, RouterContent);

    _EventBus.EventBus.subscribe(_Router.Router.ROUTE_CHANGED, this.change);
  }

  _createClass(RouterContent, [{
    key: 'change',
    value: function change(event, route) {

      console.log('RouterContent.change', event);

      if (!!route.value.hasOwnProperty('title')) {
        document.title = route.value.title;
      }

      var element = document.getElementById(ROUTER_CONTENT_UUID),
          view = _Views.Views.views[route.target.name],
          target = route.target,
          instance = _Injector.Injector.instantiate(route.target);

      _Views.Views.resolve(view, element, target, instance);

      _Bindable.Binder.run(instance, target.name);
    }
  }]);

  return RouterContent;
})()) || _class) || _class);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterLink = undefined;

var _Render = require('../render/Render');

var _Directive = require('../directive/Directive');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouterLink = exports.RouterLink = (_dec = (0, _Directive.Directive)({
  name: 'router-link'
}), _dec(_class = (function () {
  function RouterLink() {
    _classCallCheck(this, RouterLink);
  }

  _createClass(RouterLink, [{
    key: 'render',
    value: function render(element, data, value, config) {
      var property = value.substring(2);
      property = property.substring(0, property.length - 2);

      if (property.indexOf('.') > -1) {
        property = property.substring(0, property.indexOf('.'));
      }

      if (data.hasOwnProperty(property)) {
        element.setAttribute('href', '#' + _Render.Render.render(value, data));
        element.removeAttribute(config.name);
      }
    }
  }]);

  return RouterLink;
})()) || _class);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runnable = Runnable;

var _util = require('../util/util');

(0, _util.log)('Runnable.js');

function Runnable(target) {
  Object.assign(target.prototype, {
    run: function run() {}
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDescriptor = isDescriptor;
exports.decorate = decorate;
exports.first = first;
exports.last = last;
exports.ucfirst = ucfirst;
exports.log = log;
exports.guid = guid;
exports.merge = merge;
exports.cloneFunc = cloneFunc;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target) {
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

function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  var keys = ['value', 'get', 'set'];

  for (var i = 0, l = keys.length; i < l; i++) {
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
    return function () {
      return handleDescriptor.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
    };
  }
}

function first() {
  return this[0];
}

function last() {
  return this[this.length - 1];
}

function ucfirst() {
  var f = this.charAt(0).toUpperCase();
  return f + this.substr(1);
}

function log() {
  //console.log(arguments);
}

function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }

  return _p8() + _p8(true) + _p8(true) + _p8();
}

function merge(obj1, obj2) {
  return Object.assign(obj1, obj2);
}

function cloneFunc(func) {
  var reFn = /^function\s*([^\s(]*)\s*\(([^)]*)\)[^{]*\{([^]*)\}$/gi,
      s = func.toString().replace(/^\s|\s$/g, ''),
      m = reFn.exec(s);
  if (!m || !m.length) return;
  var conf = {
    name: m[1] || '',
    args: m[2].replace(/\s+/g, '').split(','),
    body: m[3] || ''
  };
  return Function.prototype.constructor.apply(this, [].concat(conf.args, conf.body));
}

log('util.js');
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Binder = undefined;
exports.Bindable = Bindable;

var _EventBus = require('../event/EventBus');

var _EventNameNormalizer = require('../event/EventNameNormalizer');

var _Injector = require('../di/Injector');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Bindable(target, key) {
  if (target.bindableFields) {
    target.bindableFields.push(key);
  } else {
    target.bindableFields = [key];
  }
}

var Binder = exports.Binder = (function () {
  function Binder() {
    _classCallCheck(this, Binder);
  }

  _createClass(Binder, null, [{
    key: 'bindArray',
    value: function bindArray(target, key, eventName) {
      //
      // override array methods
      // http://stackoverflow.com/questions/5100376/how-to-watch-for-array-changes
      //

      var methods = ['push', 'pop', 'reverse', 'shift', 'unshift', 'splice'];
      methods.forEach(function (name) {
        try {
          Object.defineProperty(target[key], name, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function value() {
              Array.prototype[name].apply(this, arguments);
              _EventBus.EventBus.publish(eventName);
              return this.length;
            }
          });
        } catch (e) {}
      });

      //Binder.bindOther(target, key, eventName);
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
          _EventBus.EventBus.publish(eventName);
        },
        get: function get() {
          return this[privateProperty];
        }
      });

      target[key] = value;
    }
  }, {
    key: 'bindInstance',
    value: function bindInstance(instance, instanceName) {
      if (!!instance.bindableFields) {
        (function () {
          var target = {
            name: instanceName
          };
          var eventName = _EventNameNormalizer.EventNameNormalizer.normalize(target, _EventBus.EventBus.CHANGE_DETECTED);

          instance.bindableFields.forEach(function (key) {
            if (instance[key] instanceof Array) {
              Binder.bindArray(instance, key, eventName);
            } else {
              Binder.bindOther(instance, key, eventName);
            }
          });
        })();
      }
    }
  }, {
    key: 'run',
    value: function run(instance, instanceName) {
      if (!!instance) {
        Binder.bindInstance(instance, instanceName);
      } else {
        for (var name in _Injector.Injector.instances) {
          Binder.bindInstance(_Injector.Injector.instances[name], instanceName);
        }
      }
    }
  }]);

  return Binder;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataViews = undefined;

var _util = require('../util/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _util.log)('DataViews.js');

var DataViews = exports.DataViews = (_temp = _class = (function () {
  function DataViews() {
    _classCallCheck(this, DataViews);
  }

  _createClass(DataViews, null, [{
    key: 'normalize',
    value: function normalize(name) {
      return name;
    }
  }, {
    key: 'add',
    value: function add(name, view, config) {
      DataViews.data[DataViews.normalize(name)] = {
        target: view,
        config: config
      };
    }
  }, {
    key: 'get',
    value: function get(name) {
      return DataViews.data[name];
    }
  }]);

  return DataViews;
})(), _class.data = {}, _temp);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = View;

var _util = require('../util/util');

var _Views = require('./Views');

(0, _util.log)('View.js');

function ViewHandlerDescriptor(target, value) {
  _Views.Views.views[target.name] = value;
}

function View(viewConfig) {
  return (0, _util.decorate)(ViewHandlerDescriptor, viewConfig);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Views = undefined;

var _Render = require('../render/Render');

var _dom = require('../dom/dom');

var _EventBus = require('../event/EventBus');

var _EventNameNormalizer = require('../event/EventNameNormalizer');

var _EventBinder = require('../event/EventBinder');

var _HTTP = require('../../http/HTTP');

var _Injector = require('../di/Injector');

var _Directives = require('../directives/Directives');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Views = exports.Views = (_temp = _class = (function () {
  function Views() {
    _classCallCheck(this, Views);
  }

  _createClass(Views, null, [{
    key: 'parseModel',
    value: function parseModel(key, target) {
      var view = Views.views[target.name],
          node = view.nodeCached,

      //template = view.templateCached,
      instance = _Injector.Injector.instances[target.name];
      //value = instance[key];

      _dom.DOM.walk(node, function () {
        _dom.DOM.cache.forEach(function (cacheNode) {
          var regexp = new RegExp(_Render.Render.START_DELIMITER + key + _Render.Render.END_DELIMITER, 'gm');

          if (cacheNode.data instanceof Array) {
            cacheNode.data.forEach(function (attr) {
              if (!!regexp.test(attr.value)) {
                cacheNode.node.setAttribute(attr.name, instance[key]);
              }
            });
          } else {
            if (!!regexp.test(cacheNode.data)) {
              cacheNode.node.nodeValue = instance[key];
            }
          }
        });
      });
    }
  }, {
    key: 'parseComponent',
    value: function parseComponent(node, template, data, target) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = _Render.Render.normalize(template);

      var nodeParsed = _Directives.Directives.parse(wrapper, data, target);

      if (!!node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }

        node.appendChild(_dom.DOM.fragment(nodeParsed));

        _dom.DOM.walk(node, function (n) {
          var regexp = new RegExp(_Render.Render.START_DELIMITER + '.*' + _Render.Render.END_DELIMITER, 'gm');

          if (n.nodeType === 1 && n.hasAttributes()) {
            _dom.DOM.attrs(n).forEach(function (attr) {
              if (!!regexp.test(attr.value)) {
                _dom.DOM.cache.push({
                  node: n,
                  data: _dom.DOM.attrs(n).slice()
                });
              }
            });
          } else if (n.data) {
            if (!!regexp.test(n.data)) {
              _dom.DOM.cache.push({
                node: n,
                data: n.data.slice()
              });
            }
            n.data = _Render.Render.render(n.data, data);
          }
        });

        _dom.DOM.parse(node).walk(node, function (element) {
          if (element.nodeType === 1) {
            var attrs = !!element.hasAttributes() ? _dom.DOM.attrs(element) : [];
            _EventBinder.EventBinder.bind(element, attrs, target);
          }
        });
      }
    }
  }, {
    key: 'parseView',
    value: function parseView(node, template, instance, target) {
      var eventName = _EventNameNormalizer.EventNameNormalizer.normalize(target, _EventBus.EventBus.CHANGE_DETECTED);

      Views.parseComponent(node, template, instance, target);

      _EventBus.EventBus.subscribe(eventName, function () {
        Views.parseComponent(node, template, instance, target);
      });
    }
  }, {
    key: 'resolve',
    value: function resolve(view, node, target, instance) {
      if (!!view) {
        var promise = undefined;

        if (!!view.hasOwnProperty(Views.TEMPLATE_URL)) {
          promise = _HTTP.HTTP.get(view[Views.TEMPLATE_URL]);
        } else if (!!view.hasOwnProperty(Views.TEMPLATE) && !view.hasOwnProperty(Views.TEMPLATE_URL)) {
          promise = Promise.resolve(view[Views.TEMPLATE]);
        } else {
          throw new Exception("View need templateUrl or template attributes");
        }

        promise.then(function (template) {
          view.templateCached = template;
          view.nodeCached = node;

          Views.parseView(node, template, instance, target);
        });
      }
    }
  }, {
    key: 'parse',
    value: function parse(node, component) {
      if (!!component) {
        var view = Views.views[component.target.name],
            target = component.target,
            instance = _Injector.Injector.instances[target.name];

        Views.resolve(view, node, target, instance);
      }
    }
  }]);

  return Views;
})(), _class.views = {}, _temp);

Views.TEMPLATE_URL = "templateUrl";
Views.TEMPLATE = "template";
"use strict";
"use strict";
'use strict';

function HTTP() {
  this.worker = new Worker("worker.js");

  this.worker.addEventListener('message', (function (e) {
    this.callback(e.data);
  }).bind(this), false);
}

HTTP.prototype.get = function (url, callback) {
  this.callback = callback;
  this.worker.postMessage({ method: 'GET', url: url });
};

var http = new HTTP();

document.getElementById('b').addEventListener('click', function () {
  http.get('data.json', function (response) {
    console.log(response);
  });
}, false);
"use strict";

self.addEventListener('message', function (e) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    self.postMessage(this.responseText);
  });
  xhr.overrideMimeType("text/json; charset=UTF8");
  xhr.open(e.data.method, e.data.url);
  xhr.send();
}, false);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LLLL = exports.LLLL = (function () {
  function LLLL() {
    _classCallCheck(this, LLLL);
  }

  _createClass(LLLL, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    }
  }]);

  return LLLL;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var llll = exports.llll = (function () {
  function llll() {
    _classCallCheck(this, llll);
  }

  _createClass(llll, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'short',
        weekday: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    }
  }]);

  return llll;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var l = exports.l = (function () {
  function l() {
    _classCallCheck(this, l);
  }

  _createClass(l, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      };
    }
  }]);

  return l;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var L = exports.L = (function () {
  function L() {
    _classCallCheck(this, L);
  }

  _createClass(L, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };
    }
  }]);

  return L;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LL = exports.LL = (function () {
  function LL() {
    _classCallCheck(this, LL);
  }

  _createClass(LL, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
    }
  }]);

  return LL;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LLL = exports.LLL = (function () {
  function LLL() {
    _classCallCheck(this, LLL);
  }

  _createClass(LLL, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    }
  }]);

  return LLL;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ll = exports.ll = (function () {
  function ll() {
    _classCallCheck(this, ll);
  }

  _createClass(ll, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
    }
  }]);

  return ll;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lll = exports.lll = (function () {
  function lll() {
    _classCallCheck(this, lll);
  }

  _createClass(lll, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    }
  }]);

  return lll;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LT = exports.LT = (function () {
  function LT() {
    _classCallCheck(this, LT);
  }

  _createClass(LT, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    }
  }]);

  return LT;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LTS = exports.LTS = (function () {
  function LTS() {
    _classCallCheck(this, LTS);
  }

  _createClass(LTS, [{
    key: 'getOptions',
    value: function getOptions() {
      return {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      };
    }
  }]);

  return LTS;
})();
//# sourceMappingURL=dali.js.map
