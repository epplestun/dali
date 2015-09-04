"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Injector = (function () {
  function Injector() {
    _classCallCheck(this, Injector);
  }

  /*
  export function() {
  	return Injector.Inject(arguments);
  };
  */

  _createClass(Injector, [{
    key: "resolve",
    value: function resolve(target) {
      var dependencies = [];

      if (!!target.dependencies) {
        dependencies = target.dependencies.map((function (target) {
          return this.resolve(target);
        }).bind(this));
      }

      var proto = target.prototype;
      var instance = Object(proto) === proto ? Object.create(proto) : {};
      var result = Function.prototype.apply.call(target, instance, dependencies);
      return Object(result) === result ? result : instance;
    }
  }, {
    key: "get",
    value: function get(target) {
      return this.resolve(target);
    }
  }], [{
    key: "Inject",
    value: function Inject() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      return function (target) {
        target.dependencies = values;
      };
    }
  }]);

  return Injector;
})();

exports.Injector = Injector;
//# sourceMappingURL=dali.js.map