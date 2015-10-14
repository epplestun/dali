import {DOM} from 'core/dom/dom';
import {Views} from 'core/view/Views';
import {Component} from 'core/component/Component';
import {Components} from 'core/component/Components';
import {TestApp} from './TestApp';

var assert = require('assert'),
  sinon = require('sinon-es6'),
  jsdom = require('mocha-jsdom'),
  originalDOMParse = DOM.parse,
  originalViewsParse = Views.parse;

describe('Components', () => {

  jsdom();

  afterEach(() => {
    DOM.parse = originalDOMParse;
    Views.parse = originalViewsParse;
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
      Views.parse = sinon.spy();

      Components.parse(document.createElement('div'), null, TestApp);

      assert.equal(Views.parse.called, true);
    });
  });

  describe('#run()', () => {
    it('should be call parse method of DOM', () => {
      DOM.parse = sinon.spy();

      Components.run(document.createElement('div'));

      assert.equal(DOM.parse.called, true);
    });
  });
});