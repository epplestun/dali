"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP = (function () {
  function HTTP() {
    _classCallCheck(this, HTTP);
  }

  _createClass(HTTP, null, [{
    key: "init",
    value: function init() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? { method: 'GET', headers: {}, cache: false, async: false, timeout: 0 } : arguments[0];

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
        if (query == '') return url;
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

      var promise = new Promise(function (resolve, reject) {
        var request = createCORSRequest(options.method, options.url);

        if (options && options.headers) {
          Object.keys(options.headers).forEach(function (key) {
            request.setRequestHeader(key, options.headers[key]);
          });
        }

        if (this.withCredentials) {
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

var _slice = Array.prototype.slice;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

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
      return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
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

log('util.js');
'use strict';

log('Component.js');

function Component(value) {
  return function decorator(target) {
    DataComponents.add(target.name, target, value);
  };
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Components = (function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, null, [{
    key: 'components',
    value: function components() {
      return DataComponents.data;
    }
  }, {
    key: 'normalize',
    value: function normalize(element) {
      return DataComponents.normalize(element.nodeName);
    }
  }, {
    key: 'exists',
    value: function exists(name) {
      return !!DataComponents.get(name);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return DataComponents.get(name);
    }
  }, {
    key: 'parse',
    value: function parse(node, attrs, component) {
      Views.parse(node, component);
    }
  }, {
    key: 'run',
    value: function run(element) {
      if (!!element) {
        DOM.parse(element);
      } else {
        document.addEventListener("DOMContentLoaded", function (event) {
          DOM.parse(event.target.body);
        });
      }
    }
  }]);

  return Components;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataComponents = (function () {
  function DataComponents() {
    _classCallCheck(this, DataComponents);
  }

  _createClass(DataComponents, null, [{
    key: 'normalize',
    value: function normalize(name) {
      var _context;

      return (_context = name.toLowerCase().replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
      }), ucfirst).call(_context);
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
  }, {
    key: 'data',
    value: {},
    enumerable: true
  }]);

  return DataComponents;
})();
'use strict';

log('Inject.js');

function InjectHandlerDescriptor(target, values) {
  target.dependencies = values;
}

function Inject() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return decorate(InjectHandlerDescriptor, args);
}
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Injector = (function () {
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
  }, {
    key: "instances",
    value: {},
    enumerable: true
  }]);

  return Injector;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataDirectives = (function () {
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
        instance: Injector.get(directive),
        config: config
      };
    }
  }, {
    key: "get",
    value: function get(name) {
      return DataDirectives.data[name];
    }
  }, {
    key: "data",
    value: {},
    enumerable: true
  }]);

  return DataDirectives;
})();
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataFor = (function () {
  function DataFor() {
    _classCallCheck(this, _DataFor);
  }

  _createClass(DataFor, [{
    key: 'render',
    value: function render(element, data, value, config, target) {
      var originalClone = element.cloneNode(true);
      var parentNode = element.parentNode;
      parentNode.removeChild(element);

      var _value$match = value.match(/([$a-zA-Z0-9]+)/g);

      var _value$match2 = _slicedToArray(_value$match, 6);

      var iterator = _value$match2[0];
      var list = _value$match2[2];
      var track = _value$match2[3];
      var by = _value$match2[4];
      var trackBy = _value$match2[5];

      data[list].forEach(function (item, index) {
        var contextData = {};
        contextData[iterator] = item;

        if (!!trackBy) {
          contextData[trackBy] = index;
        }

        var child = originalClone.cloneNode(true);
        child.removeAttribute(config.name);

        var childParsed = Directives.parseElement(child, contextData);
        var wrapper = document.createElement('div');
        wrapper.innerHTML = Render.render(childParsed.outerHTML, contextData);

        parentNode.appendChild(wrapper.firstChild);

        DOM.parse(parentNode).walk(parentNode, function (element) {
          if (element.nodeType === 1) {
            if (!element.contextData) {
              element.contextData = contextData;
            }
          }
        });
      });
    }
  }]);

  var _DataFor = DataFor;
  DataFor = Directive({
    name: 'data-for'
  })(DataFor) || DataFor;
  return DataFor;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataIf = (function () {
  function DataIf() {
    _classCallCheck(this, _DataIf);
  }

  _createClass(DataIf, [{
    key: 'render',
    value: function render(data, element, value) {
      if (!data[value]) {
        element.parentNode.removeChild(element);
      }
    }
  }]);

  var _DataIf = DataIf;
  DataIf = Directive({
    name: 'data-if'
  })(DataIf) || DataIf;
  return DataIf;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DataModel = (function () {
  function DataModel() {
    _classCallCheck(this, _DataModel);
  }

  _createClass(DataModel, [{
    key: 'render',
    value: function render(element, data, value, config, target) {
      var eventName = EventNameNormalizer.normalize(target, EventBus.MODEL_CHANGE_DETECTED);

      var instance = Injector.instances[target.name];

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

      EventBus.subscribe(eventName, function (e, data) {
        var _context;

        var key = (_context = Object.keys(data), first).call(_context);
        Views.parseModel(key, target);
      });
    }
  }]);

  var _DataModel = DataModel;
  DataModel = Directive({
    name: 'data-model'
  })(DataModel) || DataModel;
  return DataModel;
})();
'use strict';

log('Directive.js');

function Directive(value) {
  return function decorator(target) {
    DataDirectives.add(target.name, target, value);
  };
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Directives = (function () {
  function Directives() {
    _classCallCheck(this, Directives);
  }

  _createClass(Directives, null, [{
    key: 'has',
    value: function has(name) {
      return !!DataDirectives.get(name);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return DataDirectives.get(name);
    }
  }, {
    key: 'getDirectives',
    value: function getDirectives() {
      return DataDirectives.data;
    }
  }, {
    key: 'parseElement',
    value: function parseElement(element, data) {
      if (!!element.hasAttributes()) {
        var directives = elementAttrs(element).filter(function (attr) {
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
          var directives = elementAttrs(element).filter(function (attr) {
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

"use strict";

function makeMap(str) {
  var obj = {},
      items = str.split(",");
  for (var i = 0; i < items.length; i++) obj[items[i]] = true;
  return obj;
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
    else for (var pos = stack.length - 1; pos >= 0; pos--) if (stack[pos] == tagName) break;

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) if (handler.end) handler.end(stack[i]);

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }
}

function HTMLtoXML(html) {
  var results = "";

  HTMLParser(html, {
    start: function start(tag, attrs, unary) {
      results += "<" + tag;

      for (var i = 0; i < attrs.length; i++) results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

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
  if (doc.getElementsByTagName) for (var i in one) one[i] = doc.getElementsByTagName(i)[0];

  // If we're working with a document, inject contents into
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

      for (var attr in attrs) elem.setAttribute(attrs[attr].name, attrs[attr].value);

      if (structure[tagName] && typeof one[structure[tagName]] != "boolean") one[structure[tagName]].appendChild(elem);else if (curParentNode && curParentNode.appendChild) curParentNode.appendChild(elem);

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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DOM = (function () {
  function DOM() {
    _classCallCheck(this, DOM);
  }

  _createClass(DOM, null, [{
    key: 'walk',
    value: function walk(node, callback) {
      do {
        callback(node);

        if (!!node && node.hasChildNodes()) {
          DOM.walk(node.firstChild, callback);
        }
      } while (node = node.nextSibling);

      return DOM;
    }
  }, {
    key: 'clean',
    value: function clean(node) {
      for (var n = 0; n < node.childNodes.length; n++) {
        var child = node.childNodes[n];
        if (child.nodeType === 8 || child.nodeType === 3 && !/\S/.test(child.nodeValue)) {
          node.removeChild(child);
          n--;
        } else if (child.nodeType === 1) {
          DOM.clean(child);
        }
      }

      return DOM;
    }
  }, {
    key: 'childs',
    value: function childs(node) {
      var childNodes = [];
      DOM.walk(node, function (n) {
        childNodes.push(n);
      });
      childNodes.shift();

      return childNodes;
    }
  }, {
    key: 'parse',
    value: function parse(node) {
      var childNodes = DOM.childs(node);

      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }

      childNodes.forEach(function (element) {
        var componentName = Components.normalize(element);

        if (!!Components.exists(componentName)) {
          if (!!Injector.hasInstance(componentName)) {
            if (element.parentNode) {
              element.parentNode.appendChild(element);
            } else {
              node.appendChild(element);
            }

            var attrs = !!element.hasAttributes() ? elementAttrs(element) : [];
            Components.parse(element, attrs, Components.get(componentName));
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

      return DOM;
    }
  }, {
    key: 'fragment',
    value: function fragment(node) {
      var fragment = document.createDocumentFragment();

      while (node.firstChild) {
        fragment.appendChild(node.firstChild);
      }

      return fragment;
    }
  }, {
    key: 'cache',
    value: [],
    enumerable: true
  }]);

  return DOM;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Evaluator = (function () {
  function Evaluator() {
    _classCallCheck(this, Evaluator);
  }

  _createClass(Evaluator, [{
    key: 'eval',
    value: function _eval(data, code) {
      var context = data;
      return eval('context.' + code);
    }
  }]);

  return Evaluator;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var EventBinder = (function () {
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

            element.addEventListener(eventName, function (e) {
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
            element.addEventListener('input', function (e) {
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
        var instance = Injector.instances[target.name];
        EventBinder.bindInstance(element, attrs, instance);
      }
    }
  }, {
    key: 'DataCache',
    value: {},
    enumerable: true
  }]);

  return EventBinder;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = (function () {
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
      };

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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventNameNormalizer = (function () {
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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function normalizeFilterName(name) {
  return name.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

var DataFilters = (function () {
  function DataFilters() {
    _classCallCheck(this, DataFilters);
  }

  _createClass(DataFilters, null, [{
    key: 'add',
    value: function add(name, filter) {
      DataFilters.data[normalizeFilterName(name)] = Injector.get(filter);
    }
  }, {
    key: 'get',
    value: function get(name) {
      return DataFilters.data[name];
    }
  }, {
    key: 'data',
    value: {},
    enumerable: true
  }]);

  return DataFilters;
})();
'use strict';

log('Filter.js');

function Filter(target) {
  DataFilters.add(target.name, target);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Filters = (function () {
  function Filters() {
    _classCallCheck(this, Filters);
  }

  _createClass(Filters, null, [{
    key: 'get',
    value: function get(name) {
      return DataFilters.get(name);
    }
  }, {
    key: 'getFilters',
    value: function getFilters() {
      return DataFilters.data;
    }
  }]);

  return Filters;
})();
'use strict';

log('Module.js');

function Module() {}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Render = (function () {
  function Render() {
    _classCallCheck(this, Render);
  }

  _createClass(Render, null, [{
    key: 'normalize',
    value: function normalize(html) {
      var coreDirectives = [];
      for (var directive in Directives.getDirectives()) {
        //console.log(directive, Directives.get(directive).config);
        coreDirectives.push(directive.replace(Directives.PREFIX, ''));
      }

      var pattern = '\\*(' + coreDirectives.join('|') + ')';
      var regExp = new RegExp(pattern, "gm");

      return html.replace(regExp, function (p1, p2) {
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
        if (match[1].indexOf('|') > -1) {
          var _context;

          var filters = match[1].split('|').map(function (filter) {
            return filter.trim();
          });
          var value = filters.shift();

          filters = filters.map(function (name) {
            if (name.indexOf(':') === -1) {
              return {
                filter: Filters.get(name).render,
                value: null
              };
            } else {
              var filterValue = name.substring(name.indexOf(':') + 1);
              var _filterName = name.substring(0, name.indexOf(':'));
              return {
                filter: Filters.get(_filterName).render,
                value: filterValue
              };
            }
          });

          var filterName = (_context = filters, first).call(_context);

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

    /*
    static getDOM(parent) {
      let nodes = parent.childNodes[0].childNodes[1].childNodes;
      return nodes;
    }
    */
  }]);

  return Render;
})();

Render.START_DELIMITER = "{{";
Render.END_DELIMITER = "}}";
'use strict';

log('Runnable.js');

function Runnable(target) {
  Object.assign(target.prototype, {
    run: function run() {}
  });
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function Bindable(target, key) {
  if (target.bindableFields) {
    target.bindableFields.push(key);
  } else {
    target.bindableFields = [key];
  }
}

var Binder = (function () {
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
              EventBus.publish(eventName);
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
          EventBus.publish(eventName);
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
          var eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED);

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
        for (var instanceName in Injector.instances) {
          var _instance = Injector.instances[instanceName];

          Binder.bindInstance(_instance, instanceName);
        }
      }
    }
  }]);

  return Binder;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

log('DataViews.js');

var DataViews = (function () {
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
  }, {
    key: 'data',
    value: {},
    enumerable: true
  }]);

  return DataViews;
})();
'use strict';

log('View.js');

function ViewHandlerDescriptor(target, value) {
  Views.views[target.name] = value;
}

function View(viewConfig) {
  return decorate(ViewHandlerDescriptor, viewConfig);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function elementAttrs(element) {
  var nodeAttrs = Array.prototype.slice.call(element.attributes);

  return nodeAttrs.map(function (attribute) {
    return {
      name: attribute.name,
      value: attribute.value,
      escaped: attribute.value.replace(/(^|[^\\])"/g, '$1\\\"') //"
    };
  });
}

function sameAttributes(elementAttrs, attrs) {
  return elementAttrs.length === attrs.length && JSON.stringify(elementAttrs) === JSON.stringify(attrs);
}

var Views = (function () {
  function Views() {
    _classCallCheck(this, Views);
  }

  _createClass(Views, null, [{
    key: 'parseModel',
    value: function parseModel(key, target) {
      var view = Views.views[target.name];
      node = view.nodeCached, template = view.templateCached, instance = Injector.instances[target.name], value = instance[key];

      DOM.walk(node, function () {
        DOM.cache.forEach(function (cacheNode) {
          var regexp = new RegExp(Render.START_DELIMITER + key + Render.END_DELIMITER, 'gm');

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
      wrapper.innerHTML = Render.normalize(template);

      var nodeParsed = Directives.parse(wrapper, data, target);

      if (!!node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }

        node.appendChild(DOM.fragment(nodeParsed));

        DOM.walk(node, function (n) {
          var regexp = new RegExp(Render.START_DELIMITER + '.*' + Render.END_DELIMITER, 'gm');

          if (n.nodeType === 1 && n.hasAttributes()) {
            elementAttrs(n).forEach(function (attr) {
              if (!!regexp.test(attr.value)) {
                DOM.cache.push({
                  node: n,
                  data: elementAttrs(n).slice()
                });
              }
            });
          } else if (n.data) {
            if (!!regexp.test(n.data)) {
              DOM.cache.push({
                node: n,
                data: n.data.slice()
              });
            }
            n.data = Render.render(n.data, data);
          }
        });

        DOM.parse(node).walk(node, function (element) {
          if (element.nodeType === 1) {
            var attrs = !!element.hasAttributes() ? elementAttrs(element) : [];
            EventBinder.bind(element, attrs, target);
          }
        });
      }
    }
  }, {
    key: 'parseView',
    value: function parseView(node, template, instance, target) {
      var eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED);

      Views.parseComponent(node, template, instance, target);

      EventBus.subscribe(eventName, function () {
        Views.parseComponent(node, template, instance, target);
      });
    }
  }, {
    key: 'resolve',
    value: function resolve(view, node, target, instance) {
      if (!!view) {
        var promise;

        if (!!view.hasOwnProperty(Views.TEMPLATE_URL)) {
          promise = HTTP.get(view[Views.TEMPLATE_URL]);
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
            _instance = Injector.instances[target.name];;

        Views.resolve(view, node, target, _instance);
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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Router = (function () {
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

      return routes.length === 1 ? true : false;
    }
  }, {
    key: 'route',
    value: function route() {
      Router.routes.forEach(function (route) {
        var path = route.value.path;

        if (!!path.test(Router.getHash())) {
          EventBus.publish(Router.ROUTE_CHANGED, route);
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
    key: 'run',
    value: function run() {
      if (window.location.hash.length === 0) {
        Router.routeToDefault();
      } else {
        if (Router.exists()) {
          Router.route();
        } else {
          throw new Error('404');
        }
      }

      window.addEventListener('hashchange', Router.route, false);
    }
  }, {
    key: 'routes',
    value: [],
    enumerable: true
  }]);

  return Router;
})();

Router.ROUTE_CHANGED = "ROUTE_CHANGED";
'use strict';

log('RouterConfig.js');

function pathToRegexp(path, keys, sensitive, strict) {
  if (path instanceof RegExp) return path;
  if (path instanceof Array) path = '(' + path.join('|') + ')';
  path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
    keys.push({ name: key, optional: !!optional });
    slash = slash || '';
    return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
  }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');

  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}

function RouterConfigHandlerDescriptor(target, value) {
  value.url = value.path;
  value.path = pathToRegexp(value.path, [], false, false);
  Router.routes.push({ target: target, value: value });
}

function RouterConfig(arg) {
  return decorate(RouterConfigHandlerDescriptor, arg);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

log('RouterContent.js');

var ROUTER_CONTENT_UUID = guid();

var RouterContent = (function () {
  function RouterContent() {
    _classCallCheck(this, _RouterContent);

    EventBus.subscribe(Router.ROUTE_CHANGED, this.change);
  }

  _createClass(RouterContent, [{
    key: 'change',
    value: function change(event, route) {
      if (!!route.value.hasOwnProperty('title')) {
        document.title = route.value.title;
      }

      var element = document.getElementById(ROUTER_CONTENT_UUID),
          view = Views.views[route.target.name],
          target = route.target,
          instance = Injector.instantiate(route.target);

      Views.resolve(view, element, target, instance);

      Binder.run(instance, target.name);
    }
  }]);

  var _RouterContent = RouterContent;
  RouterContent = View({
    template: '<div id="' + ROUTER_CONTENT_UUID + '"></div>'
  })(RouterContent) || RouterContent;
  RouterContent = Component({
    name: 'router-content'
  })(RouterContent) || RouterContent;
  return RouterContent;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RouterLink = (function () {
  function RouterLink() {
    _classCallCheck(this, _RouterLink);
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
        element.setAttribute('href', '#' + Render.render(value, data));
        element.removeAttribute(config.name);
      }
    }
  }]);

  var _RouterLink = RouterLink;
  RouterLink = Directive({
    name: 'router-link'
  })(RouterLink) || RouterLink;
  return RouterLink;
})();
'use strict';

log('bootstrap.js');

function bootstrap(target) {
  Injector.get(target).run();
  Router.run();
  Components.run();
  Binder.run();
}