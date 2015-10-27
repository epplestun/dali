import {i18nConfig} from 'core/i18n/i18nConfig';
import {i18n} from 'core/i18n/i18n';

import {Injector} from 'core/di/Injector';
import {Datai18n} from 'core/i18n/Datai18n';

var assert = require('assert');
var jsdom = require('mocha-jsdom');

describe.only('i18n', () => {  
    
  jsdom();

  let config = {
    locale: 'en-US',
    timezone: 'Europe/Madrid',
    currency: 'EUR',
    //translations: 'locale_en_US.json'
    translations: {
      en_US : {
        app : {
          title: 'Title',
          total: 'Total: {{total, plural, =0 { You have no new messages } =1 { You have one new message } other { You have # new messages }}}',
          gender: '{{friendGender, gender, male { Invite him } female { Invite her } other { Invite them }}}'
        }
      }
    }
  };

  beforeEach(() => {
    i18nConfig.init(config);
  });  

  describe('i18nDate', () => {
    it('date timezone Europe/Madrid', () => {
      let date = new Date(Date.UTC(2015, 9, 27, 13, 15, 40));
      
      assert.equal(i18n.from(date, i18nConfig.getConfig()).format('short'), '10/27/2015, 14:15:40');
    });

    it('date timezone Atlantic/Canary', () => {
      let date = new Date(Date.UTC(2015, 9, 27, 13, 15, 40));
      config.timezone = 'Atlantic/Canary';

      i18nConfig.init(config);

      assert.equal(i18n.from(date, i18nConfig.getConfig()).format('short'), '10/27/2015, 13:15:40');
    });
  });

  describe('i18nNumber', () => {
    it('decimal', () => {    
      assert.equal(i18n.from(1185.23, i18nConfig.getConfig()).format(), '1,185.23');
    });

    it('currency', () => {
      assert.equal(i18n.from(1518.23, i18nConfig.getConfig()).format('currency'), '€1,518.23');
    });

    it('percent', () => {
      assert.equal(i18n.from(27, i18nConfig.getConfig()).format('percent'), '27%');
    });
  });

  describe('i18nTranslate', () => {
    it('translate', () => {
      assert.equal(i18n.from('app.title', i18nConfig.getConfig()).format(), 'Title');
    });

    it('translate plural zero', () => {
      assert.equal(i18n.from('app.total', i18nConfig.getConfig()).format({ total: 0 }), 'You have no new messages');
    });

    it('translate plural one', () => {
      assert.equal(i18n.from('app.total', i18nConfig.getConfig()).format({ total: 1 }), 'You have one new message');
    });

    it('translate plural more than one', () => {
      assert.equal(i18n.from('app.total', i18nConfig.getConfig()).format({ total: 10 }), 'You have 10 new messages');
    });

    it('translate gender male', () => {
      assert.equal(i18n.from('app.gender', i18nConfig.getConfig()).format({ friendGender: 'male' }), 'Invite him');
    });

    it('translate gender female', () => {
      assert.equal(i18n.from('app.gender', i18nConfig.getConfig()).format({ friendGender: 'female' }), 'Invite her');
    });

    it('translate gender other', () => {
      assert.equal(i18n.from('app.gender', i18nConfig.getConfig()).format({ friendGender: 'other' }), 'Invite them');
    });
  });

  describe('i18nDirective', () => {    
    describe('#render', () => {
      it('i18n attribute translation', () => {
        let datai18n = Injector.get(Datai18n);

        let element = document.createElement('p');
        element.setAttribute("i18n", "app.title");

        datai18n.render(element);

        assert.equal(element.textContent, 'Title');
        assert.equal(element.hasAttribute('i18n'), false);
      }); 

      it('i18n attribute plural zero translation', () => {
        let datai18n = Injector.get(Datai18n);

        let element = document.createElement('p');
        element.setAttribute("i18n", "app.total");
        element.setAttribute("i18n-value", JSON.stringify({ total: 0 }));

        datai18n.render(element);

        assert.equal(element.textContent, 'You have no new messages');
        assert.equal(element.hasAttribute('i18n'), false);
        assert.equal(element.hasAttribute('i18n-value'), false);
      });  

      it('i18n attribute plural one translation', () => {
        let datai18n = Injector.get(Datai18n);

        let element = document.createElement('p');
        element.setAttribute("i18n", "app.total");
        element.setAttribute("i18n-value", JSON.stringify({ total: 1 }));

        datai18n.render(element);

        assert.equal(element.textContent, 'You have one new message');
        assert.equal(element.hasAttribute('i18n'), false);
        assert.equal(element.hasAttribute('i18n-value'), false);
      });  

      it('i18n attribute plural more than one translation', () => {
        let datai18n = Injector.get(Datai18n);

        let element = document.createElement('p');
        element.setAttribute("i18n", "app.total");
        element.setAttribute("i18n-value", JSON.stringify({ total: 10 }));

        datai18n.render(element);

        assert.equal(element.textContent, 'You have 10 new messages');
        assert.equal(element.hasAttribute('i18n'), false);
        assert.equal(element.hasAttribute('i18n-value'), false);
      });     
    });
  });
});