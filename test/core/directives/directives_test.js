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

var assert = require("assert");

describe.skip('Directives', () => {
  describe('For', () => {
    describe('#render()', () => {
      it('FOR ->', () => {
        assert.equal(true, false);
      });
    });
  });

  describe('If', () => {
    describe('#render()', () => {
      it('IF ->', () => {
        assert.equal(true, false);
      });
    });
  });

  describe('Model', () => {
    describe('#render()', () => {
      it('MODEL ->', () => {
        assert.equal(true, false);
      });
    });
  });
});