'use strict';
'use strict';

function bootstrap(target) {
  Injector.get(target).run();
  Router.run();
}
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP = (function () {
	function HTTP() {
		_classCallCheck(this, HTTP);
	}

	_createClass(HTTP, [{
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
		value: function post() {}
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
'use strict';

function ComponentHandlerDescriptor(target, value) {
  console.log('ComponentHandlerDescriptor', target, value);
}

function Component(arg) {
  return decorate(ComponentHandlerDescriptor, arg);
}
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
    key: 'route',
    value: function route() {
      Router.routes.forEach(function (route) {
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
  value.path = pathToRegexp(value.path, [], false, false);
  Router.routes.push({ target: target, value: value });
}

function RouterConfig(arg) {
  return decorate(RouterConfigHandlerDescriptor, arg);
}
"use strict";

function Module() {}
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
'use strict';

function ViewHandlerDescriptor(target, value) {
  console.log('ViewHandlerDescriptor', target, value);
  //target.view = value;
}

function View(arg) {
  return decorate(ViewHandlerDescriptor, arg);
}