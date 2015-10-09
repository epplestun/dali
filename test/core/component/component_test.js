import {DOM} from 'core/dom/dom';
import {Component} from 'core/component/Component';
import {Components} from 'core/component/Components';

var assert = require('assert');
var sinon = require('sinon-es6')
var jsdom = require('mocha-jsdom');

@Component({
  name: 'test-app'
})
class TestApp {}


/*
function test() {
  return 'test';
}

function test2() {
  return test();
}
*/

describe('Components', () => {

  jsdom();
  
  //var sandbox;

  //beforeEach(function() {
    //sandbox = sinon.sandbox.create();
    //sandbox.stub(DOM.parse);
    //sandbox.spy(window.console, 'log');
  //});

  //afterEach(function() {
    //sandbox.restore();
  //});  

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

  describe.skip('#parse()', () => {
    it('...');
  });

  describe.skip('#run()', () => {
    it('should be call parse method of DOM', () => {
      //sinon.spy(test);
      
      test2();      

      //assert.equal(test.called, true);

      sinon.assert.calledOnce(console.log)
    });
  });
});