/*
import {DataFor} from '../../../src/core/directives/DataFor.js';

var assert = require("assert");

describe('DataFor', function() {
  describe('#render()', function() {
    it.skip('should be have three p elements', function () {
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
    });
  });
});
*/