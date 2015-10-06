import {Render} from '../../../src/core/render/Render.js';

var assert = require("assert");

describe('Render', function() {
  describe('#normalize()', function() {
    it('should be have normalized HTML', function () {
      let original = "<p *for=\"item in items\">{{name}}</p>";
      let expected = "<p data-for=\"item in items\">{{name}}</p>";

      assert.equal(expected, Render.normalize(original));
    });
  });

  describe('#render()', function() {
    it('should be render html', function () {
      let data = {
            items: [1,2,3]
          },
          original = "<p *for=\"item in items\">{{item}}</p>",
          expected = "<p data-for=\"item in items\"></p>";

      assert.equal(expected, Render.render(
        Render.normalize(original), 
        data
      ));
    });
  });
});