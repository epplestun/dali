import {i18n} from 'core/i18n/i18n';

var assert = require('assert');

describe('i18n', () => {
    
  let config = {
    locale: 'en-US',
    timezone: 'Europe/Madrid',
    //timezone: 'Atlantic/Canary',
    currency: 'EUR',
    //translations: 'locale_es_ES.json'
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

  describe('i18nDate', () => {
    it('date timezone Europe/Madrid', () => {
      let date = new Date(2015, 9, 27, 13, 15, 40);
      
      assert.equal(i18n.from(date, config).format('short'), '10/27/2015, 13:15:40');
    });

    it('date timezone Atlantic/Canary', () => {
      let date = new Date(2015, 9, 27, 13, 15, 40);
      config.timezone = 'Atlantic/Canary';

      assert.equal(i18n.from(date, config).format('short'), '10/27/2015, 12:15:40');
    });
  });

  describe('i18nNumber', () => {
    it('decimal', () => {    
      assert.equal(i18n.from(1185.23, config).format(), '1,185.23');
    });

    it('currency', () => {
      assert.equal(i18n.from(1518.23, config).format('currency'), '€1,518.23');
    });

    it('percent', () => {
      assert.equal(i18n.from(27, config).format('percent'), '27%');
    });
  });

  describe('i18nTranslate', () => {
    it('translate', () => {
      assert.equal(i18n.from('app.title', config).format(), 'Title');
    });

    it('translate plural zero', () => {
      assert.equal(i18n.from('app.total', config).format({ total: 0 }), 'You have no new messages');
    });

    it('translate plural one', () => {
      assert.equal(i18n.from('app.total', config).format({ total: 1 }), 'You have one new message');
    });

    it('translate plural more than one', () => {
      assert.equal(i18n.from('app.total', config).format({ total: 10 }), 'You have 10 new messages');
    });

    it('translate gender male', () => {
      assert.equal(i18n.from('app.gender', config).format({ friendGender: 'male' }), 'Invite him');
    });

    it('translate gender female', () => {
      assert.equal(i18n.from('app.gender', config).format({ friendGender: 'female' }), 'Invite her');
    });

    it('translate gender other', () => {
      assert.equal(i18n.from('app.gender', config).format({ friendGender: 'other' }), 'Invite them');
    });
  });
});