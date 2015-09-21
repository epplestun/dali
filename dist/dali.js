'use strict';
'use strict';

function bootstrap(target) {
  Injector.get(target).run();
  Router.run();
  Components.run();
  Binder.run();
}
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
  Components.components.push({ target: target, value: value });
}

function Component(arg) {
  return decorate(ComponentHandlerDescriptor, arg);
}
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Components = (function () {
  function Components() {
    _classCallCheck(this, Components);
  }

  _createClass(Components, null, [{
    key: 'parse',
    value: function parse(node, name, attrs) {
      var component = Components.components.filter(function (component) {
        return component.value.name === name;
      });

      //console.log(attrs);

      Views.parse(node, first.call(component));
    }
  }, {
    key: 'run',
    value: function run() {
      document.addEventListener("DOMContentLoaded", function (event) {
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

function normalizeDirectiveName(name) {
  name = name.charAt(0).toLowerCase() + name.slice(1);
  return name.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

var DataDirective = (function () {
  function DataDirective() {
    _classCallCheck(this, DataDirective);
  }

  _createClass(DataDirective, null, [{
    key: "add",
    value: function add(name, directive, config) {
      DataDirective.data[normalizeDirectiveName(name)] = {
        instance: Injector.get(directive),
        config: config
      };
    }
  }, {
    key: "get",
    value: function get(name) {
      return DataDirective.data[name];
    }
  }, {
    key: "data",
    value: {},
    enumerable: true
  }]);

  return DataDirective;
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

      data[list].forEach(function (item, index) {
        var contextData = {};
        contextData[iterator] = item;

        if (!!trackBy) {
          contextData[trackBy] = index;
        }

        var childElement = cloneElement.cloneNode(true);
        var args = childElement.innerHTML.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
        args = args.length > 0 ? args.split(/,/) : [];
        oldArgs = '(' + args.join(',') + ')';
        newArgs = '(' + args.map(function (item) {
          return Render.START_DELIMITER + item + Render.END_DELIMITER;
        }).join(',') + ')';

        childElement.innerHTML = childElement.innerHTML.replace(oldArgs, newArgs);

        childElement.innerHTML = Render.render(childElement.innerHTML, contextData);

        parentNode.appendChild(childElement);
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

      EventBus.subscribe(eventName, function (e, data) {
        var _context;

        var key = (_context = Object.keys(data), first).call(_context);

        Views.parseModel(key, data, target);
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

function Directive(value) {
  return function decorator(target) {
    DataDirective.add(target.name, target, value);
  };
}
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directives = (function () {
  function Directives() {
    _classCallCheck(this, Directives);
  }

  _createClass(Directives, null, [{
    key: "get",
    value: function get(name) {
      return DataDirective.get(name);
    }
  }, {
    key: "getDirectives",
    value: function getDirectives() {
      return DataDirective.data;
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
    key: 'bind',
    value: function bind(element, attrs, target) {
      if (attrs.length > 0) {
        (function () {
          var instance = Injector.instances[target.name];

          attrs.forEach(function (attr) {
            var attrName = attr.name,
                attrValue = attr.value;

            if (attrName.charAt(0) === '_') {
              var eventName = attrName.substring(1);

              element.addEventListener(eventName, function (e) {
                var methodName = attrValue.match(/^(.*)\(/mi)[1];
                var args = attrValue.match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
                args = args.length > 0 ? args.split(/,/) : [];
                args = args.map(function (arg) {
                  return setPrimitive(arg);
                });

                instance[methodName].apply(instance, args);
              }, false);
            }

            if (attrName === 'data-model') {
              element.addEventListener('input', function (e) {
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
"use strict";

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

      //reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
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

function Runnable(target) {
  Object.assign(target.prototype, {
    run: function run() {}
  });
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
    key: 'run',
    value: function run() {
      var _loop = function () {
        var instance = Injector.instances[instanceName];

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
    value: function parseModel(key, data, target) {
      var view = Views.views[target.name];
      node = view.nodeCached, template = view.templateCached;

      var wrapper = document.createElement('div');
      wrapper.innerHTML = Render.normalize(template);

      var wrapperChildNodes = Array.prototype.slice.call(wrapper.getElementsByTagName("*")).filter(function (element) {
        return element.nodeType === 1;
      });

      wrapperChildNodes = wrapperChildNodes.filter(function (element) {
        var regexp = new RegExp('{{' + key + '}}');
        return regexp.test(element.innerText);
      });

      wrapperChildNodes.forEach(function (wrapperChildNode) {
        var attrs = elementAttrs(wrapperChildNode);

        var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter(function (element) {
          return element.nodeType === 1;
        });
        var childNode = childNodes.filter(function (element) {
          var nodeAttrs = !!element.hasAttributes() ? elementAttrs(element) : [];
          return element.nodeName.toLowerCase() === wrapperChildNode.nodeName.toLowerCase() && sameAttributes(nodeAttrs, attrs);
        });

        childNode.forEach(function (cn) {
          cn.innerHTML = Render.render(wrapperChildNode.innerHTML, data);
        });
      });
    }
  }, {
    key: 'parseAll',
    value: function parseAll(node, template, data, target) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = Render.normalize(template);

      var wrapperChildNodes = Array.prototype.slice.call(wrapper.getElementsByTagName("*")).filter(function (element) {
        return element.nodeType === 1;
      });

      wrapperChildNodes.forEach(function (element) {
        if (!!element.hasAttributes()) {
          var attrs = elementAttrs(element);

          attrs.forEach(function (attr) {
            var directive = Directives.get(attr.name);

            if (!!directive) {
              directive.instance.render(data, element, attr.value, target);
            }
          });
        }
      });

      node.innerHTML = Render.render(wrapper.innerHTML, data);

      var childNodes = Array.prototype.slice.call(node.getElementsByTagName("*")).filter(function (element) {
        return element.nodeType === 1;
      });

      childNodes.forEach(function (cn) {
        var attrs = !!cn.hasAttributes() ? elementAttrs(cn) : [];
        EventBinder.bind(cn, attrs, target);
      });
    }
  }, {
    key: 'parse',
    value: function parse(node, component) {
      if (!!component) {
        var promise;

        (function () {
          var view = Views.views[component.target.name];

          if (!!view) {

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

              var target = component.target,
                  eventName = EventNameNormalizer.normalize(target, EventBus.CHANGE_DETECTED),
                  instance = Injector.instances[target.name];

              Views.parseAll(node, template, instance, target);

              EventBus.subscribe(eventName, function () {
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