import {Injector} from 'core/di/Injector';
import {DataIf} from 'core/directives/DataIf';
import {DataFor} from 'core/directives/DataFor';
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

  describe('For', () => {
    describe('#render()', () => {
      let dataFor = Injector.get(DataFor),
          value = 'item in items',
          config = { name: 'data-for' };

      it('repeat <p> element three times', () => {
        let data = {
          items: [1, 2, 3]
        };

        let element = document.createElement('p'),
            container = document.createElement('div');
        container.appendChild(element);

        dataFor.render(element, data, value, config);

        assert.equal(container.childNodes.length, data.items.length);
      });

      it('repeat <p> element three times and <p> text are: 1, 2, 3', () => {
        let data = {
          items: [1, 2, 3]
        };

        let element = document.createElement('p');
        element.innerHTML = '{{item}}';
        
        let container = document.createElement('div');
        container.appendChild(element);

        dataFor.render(element, data, value, config);

        assert.equal(container.childNodes.length, data.items.length);

        data.items.forEach((value, index) => {
          assert.equal(container.childNodes[index].innerHTML, value);  
        });
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