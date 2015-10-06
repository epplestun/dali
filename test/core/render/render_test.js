import {Render} from 'core/render/Render';

var assert = require("assert");

describe('Render', () => {
  describe('#normalize()', () => {
    it('should be have normalized HTML', () => {
      let original = "<p *for=\"item in items\">{{name}}</p>";
      let expected = "<p data-for=\"item in items\">{{name}}</p>";

      assert.equal(expected, Render.normalize(original));
    });
  });

  describe('#render()', () => {
    it('should be render html', () => {
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