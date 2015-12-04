import {i18n} from 'core/i18n/i18n';
import {i18nConfig} from 'core/i18n/i18nConfig';
import {Injector} from 'core/di/Injector';
import {DataI18n} from 'core/i18n/Datai18n';
import {HTTP} from 'http/HTTP';

var assert = require('assert'),
  sinon = require('sinon'),
  jsdom = require('mocha-jsdom');

require('sinon-as-promised');

let okGetResponse = {
  app: {
    title: 'Title',
    total: 'Total: {{total, plural, =0 { You have no new messages } =1 { You have one new message } other { You have # new messages }}}',
    gender: '{{friendGender, gender, male { Invite him } female { Invite her } other { Invite them }}}'
  }
};

var getStub = sinon.stub(HTTP, 'get').resolves(okGetResponse);

@i18nConfig({
  locale: 'en-US',
  timezone: 'Europe/Madrid',
  currency: 'EUR',
  loader: 'locale-en-us.json'
}) class MockTarget {
}

getStub.restore();

describe('i18n', () => {
  jsdom();

  before(() => {
    var _attrToDataKey = function (val) {
      var out = val.substr(5);
      return out.split('-').map(function (part, inx) {
        if (!inx) {
          return part;
        }
        return part.charAt(0).toUpperCase() + part.substr(1);
      }).join('');
    };
    var _datasetProxy = null;
    var _getNodeDataAttrs = function (el) {
      var atts = el.attributes;
      var len = atts.length;
      var attr;
      var _datasetMap = [];
      var proxy = {};
      var datakey;

      for (var i = 0; i < len; i++) {
        attr = atts[i].nodeName;
        if (attr.indexOf('data-') === 0) {
          datakey = _attrToDataKey(attr);

          if (typeof _datasetMap[datakey] !== 'undefined') {
            break;
          }

          _datasetMap[datakey] = atts[i].nodeValue;

          (function (datakey) {
            Object.defineProperty(proxy, datakey, {
              enumerable: true,
              configurable: true,
              get: function () {
                return _datasetMap[datakey];
              },
              set: function (val) {
                _datasetMap[datakey] = val;
                el.setAttribute(attr, val);
              }
            })
          }(datakey));
        }
      }
      return proxy;
    };

    if (!!global && !!global.window && !!global.window.Element && !global.window.Element.prototype.hasOwnProperty('dataset')) {
      Object.defineProperty(global.window.Element.prototype, 'dataset', {
        get: function () {
          _datasetProxy = _datasetProxy || _getNodeDataAttrs(this)
          return _datasetProxy
        }
      });
    }
  });

  beforeEach(() => {
    i18n.setConfig('timezone', 'Europe/Madrid');
  });

  describe('i18nDate', () => {
    it('date timezone Europe/Madrid', () => {
      let date = new Date(Date.UTC(2015, 9, 27, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format(''), '10/27/2015, 14:15:40');
    });

    it('date timezone Atlantic/Canary', () => {
      let date = new Date(Date.UTC(2015, 9, 27, 13, 15, 40));
      i18n.setConfig('timezone', 'Atlantic/Canary');

      assert.equal(i18n.from(date, i18n.getConfig()).format(''), '10/27/2015, 13:15:40');
    });

    it('date timezone Europe/Madrid LT format', () => {
      let date = new Date(Date.UTC(2015, 9, 27, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('LT'), '2:15 PM');
    });

    it('date timezone Europe/Madrid LTS format', () => {
      let date = new Date(Date.UTC(2015, 9, 27, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('LTS'), '2:15:40 PM');
    });

    it('date timezone Europe/Madrid L format', () => {
      let date = new Date(Date.UTC(2015, 9, 1, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('L'), '10/01/2015');
    });

    it('date timezone Europe/Madrid l format', () => {
      let date = new Date(Date.UTC(2015, 9, 1, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('l'), '10/1/2015');
    });

    it('date timezone Europe/Madrid LL format', () => {
      let date = new Date(Date.UTC(2015, 9, 28, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('LL'), 'October 28, 2015');
    });

    it('date timezone Europe/Madrid ll format', () => {
      let date = new Date(Date.UTC(2015, 9, 28, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('ll'), 'Oct 28, 2015');
    });

    it('date timezone Europe/Madrid LLL format', () => {
      let date = new Date(Date.UTC(2015, 9, 28, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('LLL'), 'October 28, 2015, 2:15 PM');
    });

    it('date timezone Europe/Madrid lll format', () => {
      let date = new Date(Date.UTC(2015, 9, 28, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('lll'), 'Oct 28, 2015, 2:15 PM');
    });

    it('date timezone Europe/Madrid LLLL format', () => {
      let date = new Date(Date.UTC(2015, 9, 28, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('LLLL'), 'Wednesday, October 28, 2015, 2:15 PM');
    });

    it('date timezone Europe/Madrid llll format', () => {
      let date = new Date(Date.UTC(2015, 9, 28, 13, 15, 40));

      assert.equal(i18n.from(date, i18n.getConfig()).format('llll'), 'Wed, Oct 28, 2015, 2:15 PM');
    });
  });

  describe('i18nNumber', () => {
    it('decimal', () => {
      assert.equal(i18n.from(1185.23, i18n.getConfig()).format(), '1,185.23');
    });

    it('currency', () => {
      assert.equal(i18n.from(1518.23, i18n.getConfig()).format('currency'), '€1,518.23');
    });

    it('percent', () => {
      assert.equal(i18n.from(27, i18n.getConfig()).format('percent'), '27%');
    });
  });

  describe('i18nTranslate', () => {
    it('translate', () => {
      assert.equal(i18n.from('app.title', i18n.getConfig()).format(), 'Title');
    });

    it('translate plural zero', () => {
      assert.equal(i18n.from('app.total', i18n.getConfig()).format({total: 0}), 'You have no new messages');
    });

    it('translate plural one', () => {
      assert.equal(i18n.from('app.total', i18n.getConfig()).format({total: 1}), 'You have one new message');
    });

    it('translate plural more than one', () => {
      assert.equal(i18n.from('app.total', i18n.getConfig()).format({total: 10}), 'You have 10 new messages');
    });

    it('translate gender male', () => {
      assert.equal(i18n.from('app.gender', i18n.getConfig()).format({friendGender: 'male'}), 'Invite him');
    });

    it('translate gender female', () => {
      assert.equal(i18n.from('app.gender', i18n.getConfig()).format({friendGender: 'female'}), 'Invite her');
    });

    it('translate gender other', () => {
      assert.equal(i18n.from('app.gender', i18n.getConfig()).format({friendGender: 'other'}), 'Invite them');
    });
  });

  describe('i18nDirective', () => {
    describe('#render', () => {
      it('i18n attribute translation', () => {
        let datai18n = Injector.get(DataI18n);

        let element = document.createElement('p');
        element.dataset.i18n = "app.title";

        datai18n.render(element);

        assert.equal(element.textContent, 'Title');
      });

      it('i18n attribute plural zero translation', () => {
        let datai18n = Injector.get(DataI18n);

        let element = document.createElement('p');
        element.dataset.i18n = "app.total";
        element.dataset.i18nValue = JSON.stringify({total: 0})

        datai18n.render(element);

        assert.equal(element.textContent, 'You have no new messages');
      });

      it('i18n attribute plural one translation', () => {
        let datai18n = Injector.get(DataI18n);

        let element = document.createElement('p');
        element.dataset.i18n = "app.total";
        element.dataset.i18nValue = JSON.stringify({total: 1})

        datai18n.render(element);

        assert.equal(element.textContent, 'You have one new message');
      });

      it('i18n attribute plural more than one translation', () => {
        let datai18n = Injector.get(DataI18n);

        let element = document.createElement('p');
        element.dataset.i18n = "app.total";
        element.dataset.i18nValue = JSON.stringify({total: 10});

        datai18n.render(element);

        assert.equal(element.textContent, 'You have 10 new messages');
      });

      it('i18n date LT format', () => {
        let data = {
          date: new Date(Date.UTC(2015, 9, 27, 13, 15, 40))
        };
        let datai18n = Injector.get(DataI18n);

        let element = document.createElement('p');

        datai18n.render(element, data, 'date | LTS');

        assert.equal(element.textContent, '2:15:40 PM');
      });
    });
  });
});