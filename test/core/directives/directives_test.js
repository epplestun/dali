/*
import {DataIf} from 'core/directives/DataIf';

var assert = require("assert");

let dataFor = new DataFor(),
    original = "<p *for=\"item in items\">{{name}}</p>",
    expected = "<p>1</p><p>2</p><p>3</p>";

let element = document.createElement('div'),
    data = {
      items: [1, 2, 3]
    },
    value = "",
    config = {
      name: 'data-for'
    },
    target = {};

assert.equal(
  expected, 
  dataFor.render(element, data, value, config, target)
);
*/

import {DataIf} from 'core/directives/DataIf';
import {DataFor} from 'core/directives/DataFor';
import {DataModel} from 'core/directives/DataModel';

var assert = require("assert");
var jsdom = require('mocha-jsdom');

describe.skip('Directives', () => {

  jsdom();

  describe('If', () => {
    describe('#render()', () => {
      it('remove p element from div', () => {
        let data = {
          isVisible : false
        };
        let value = 'isVisible';

        let element = document.createElement('p');
        let container = document.createElement('div');
        container.appendChild(element);

        let dataIf = new DataIf();

        dataIf.render(element, data, value);

        assert.equal(container.childNodes.length, 0);
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