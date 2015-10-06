/*
import {DataFor} from 'core/directives/DataFor';

var assert = require("assert");

describe('DataFor', () => {
  describe('#render()', () => {
    it.only('should be have three p elements', () => {
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