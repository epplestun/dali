import {DOM} from '../../../src/core/dom/dom';
import {Views} from '../../../src/core/view/Views';
import {Component} from '../../../src/core/component/Component';
import {Components} from '../../../src/core/component/Components';
import {TestApp} from './TestApp';

var assert = require('assert'),
  sinon = require('sinon'),
  jsdom = require('mocha-jsdom');

require('sinon-as-promised');

describe('Components', () => {
  var domParseSpy, viewsParseSpy;

  jsdom();

  beforeEach(() => {
    domParseSpy = sinon.spy(DOM, 'parse');
    viewsParseSpy = sinon.spy(Views, 'parse');
  });

  afterEach(() => {
    domParseSpy.restore();
    viewsParseSpy.restore();
    //done();
  });

  describe('#normalize()', () => {
    it('component name should be have the first letter uppercase', () => {
      let node = document.createElement('test');
      assert.equal(Components.normalize(node), 'Test');
    });

    it('component name should be have snake-case format with the first letter uppercase', () => {
      let node = document.createElement('test-app');
      assert.equal(Components.normalize(node), 'TestApp');
    });
  });

  describe('#exists()', () => {
    it('should be false if component do not exists', () => {
      assert.equal(Components.exists('asda'), false);
    });

    it('should be true if component exists', () => {
      assert.equal(Components.exists('TestApp'), true);
    });
  });

  describe('#get()', () => {
    it('should be return an object with component target and config', () => {
      assert.equal(Components.get('TestApp').hasOwnProperty('target'), true);
      assert.equal(Components.get('TestApp').hasOwnProperty('config'), true);
    });

    it('should be test-app name of component', () => {
      assert.equal(Components.get('TestApp').config.name, 'test-app');
    })
  });

  describe('#parse()', () => {
    it('should be call parse method of Views', () => {
      Components.parse(document.createElement('div'), Components.get(TestApp.name));

      assert.equal(Views.parse.called, true);
    });
  });

  describe('#run()', () => {
    it('should be call parse method of DOM', () => {
      Components.run(document.createElement('div'));

      assert.equal(DOM.parse.called, true);
    });
  });
});