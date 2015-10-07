import {Injector} from 'core/di/Injector';
import {DataIf} from 'core/directives/DataIf';
//import {DataFor} from 'core/directives/DataFor';
//import {DataModel} from 'core/directives/DataModel';

var assert = require("assert");
var jsdom = require('mocha-jsdom');

describe('Directives', () => {

  jsdom();

  describe('If', () => {
    describe('#render()', () => {
      let dataIf = Injector.get(DataIf),
          value = 'isVisible';

      it('remove <p> element from <div>', () => {
        let data = {
          isVisible : false
        };        

        let element = document.createElement('p'),
            container = document.createElement('div');
        container.appendChild(element);

        dataIf.render(element, data, value);

        assert.equal(container.childNodes.length, 0);
      });

      it('do not remove <p> element from <div>', () => {
        let data = {
          isVisible : true
        };
            
        let element = document.createElement('p'),
            container = document.createElement('div');
        container.appendChild(element);

        dataIf.render(element, data, value);

        assert.equal(container.childNodes.length, 1);
      });
    });
  });

  describe.skip('For', () => {
    describe('#render()', () => {
      it('FOR ->', () => {
        assert.equal(true, false);
      });
    });
  });

  describe.skip('Model', () => {
    describe('#render()', () => {
      it('MODEL ->', () => {
        assert.equal(true, false);
      });
    });
  });
});