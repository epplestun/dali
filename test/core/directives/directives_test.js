import {Injector} from '../../../src/core/di/Injector';
import {DataIf} from '../../../src/core/directives/DataIf';
import {DataFor} from '../../../src/core/directives/DataFor';
import {DataStyle} from '../../../src/core/directives/DataStyle';
import {DataClass} from '../../../src/core/directives/DataKlass';
//import {DataModel} from 'core/directives/DataModel';

import assert from "assert";
import jsdom from 'mocha-jsdom';

describe('Directives', () => {

  jsdom();

  before((done) => {
    done();
  });

  describe('If', () => {
    describe('#render()', () => {
      let dataIf = Injector.get(DataIf),
        value = 'isVisible';

      it('remove <p> element from <div>', () => {
        let data = {
          isVisible: false
        };

        let element = document.createElement('p'),
          container = document.createElement('div');
        container.appendChild(element);

        dataIf.render(element, data, value);

        assert.equal(container.childNodes.length, 0);
      });

      it('do not remove <p> element from <div>', () => {
        let data = {
          isVisible: true
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
        config = {name: 'data-for'};

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

  describe('Style', () => {
    describe('#render', () => {
      let dataStyle = Injector.get(DataStyle),
        value = "'font-style' : prop1, 'color': prop2";

      it('apply style to the element', () => {
        let data = {
          prop1: 'italic',
          prop2: 'red'
        };

        let element = document.createElement('p'),
          container = document.createElement('div');
        container.appendChild(element);

        dataStyle.render(element, data, value);

        assert.equal(element.style.fontStyle, data.prop1);
        assert.equal(element.style.color, data.prop2);
      });
    })
  });

  describe('Class', () => {
    describe('#render', () => {
      let dataClass = Injector.get(DataClass);

      it('apply class1 and class2 names to the element', () => {
        let data = {
            prop1: 10,
            prop2: 5
          },
          value = "'class1' : prop1 > prop2, 'class2' : prop2 < prop1";

        let element = document.createElement('p');

        dataClass.render(element, data, value);

        assert.equal(element.classList.contains('class1'), true);
        assert.equal(element.classList.contains('class2'), true);
      });

      it('apply only class1 names to the element', () => {
        let data = {
            prop1: 10,
            prop2: 5
          },
          value = "'class1' : prop1 > prop2, 'class2' : prop2 == prop1";

        let element = document.createElement('p');

        dataClass.render(element, data, value);

        assert.equal(element.classList.contains('class1'), true);
        assert.equal(element.classList.contains('class2'), false);
      });
    })
  });

  describe('Model', () => {
    describe('#render()', () => {
      it('MODEL ->');
    });
  });
});