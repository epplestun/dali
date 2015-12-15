import {DOM} from '../../../src/core/dom/dom';
import assert from 'assert';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';

describe('DOM', () => {

  jsdom();

  let mainNode;

  beforeEach(() => {
    mainNode = document.createElement('div');
    mainNode.appendChild(document.createElement('p'));
    mainNode.appendChild(document.createElement('p'));
    mainNode.appendChild(document.createComment('test comment'));
    mainNode.appendChild(document.createElement('p'));
    mainNode.appendChild(document.createElement('p'));
  });

  describe('#walk', () => {
    it('should be apply callback around node and all childs', () => {
      var spy = sinon.spy();

      DOM.clean(mainNode);
      DOM.walk(mainNode, spy);

      assert.equal(spy.called, true);
      assert.equal(spy.callCount, 5);
    });
  });

  describe('#clean', () => {
    it('should be remove comment nodes and text nodes', () => {
      DOM.clean(mainNode);
      assert.equal(mainNode.childNodes.length, 4);
    });
  });

  describe('#childs', () => {
    it('should be have 5 childs', () => {
      let childs = DOM.childs(mainNode);
      assert.equal(childs.length, 5);
    });
  });

  describe('#parse', () => {
    it('...');
  });

  describe('#fragment', () => {
    it('should be create a document fragment', () => {
      let newNnode = document.createElement('div'),
        fragment = DOM.fragment(newNnode);

      assert.equal(fragment instanceof DocumentFragment, true);
    });
  });
});