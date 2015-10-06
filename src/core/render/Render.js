import {first} from 'core/util/util';
import {Directives} from 'core/directives/Directives';
import {Filters} from 'core/filters/Filters';

export class Render {
  
  static normalize(html) {
    let coreDirectives = [];
    for(let directive in Directives.getDirectives()) {
      //console.log(directive, Directives.get(directive).config);
      coreDirectives.push(directive.replace(Directives.PREFIX, ''));
    }

    let pattern = '\\*(' + coreDirectives.join('|') + ')';
    let regExp = new RegExp(pattern, "gm");

    return html.replace(regExp, (p1, p2) => Directives.PREFIX + p2);
  }

  static render(html, options) {
    var re = new RegExp(Render.START_DELIMITER + '([^' + Render.END_DELIMITER + ']+)?' + Render.END_DELIMITER, 'g'),
      reExp = /^( )?({|})(.*)*/g,
      code = 'var r=[];\n',
      cursor = 0,
      match;

    var add = function (line, js) {
      js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
      return add;
    }

    while (match = re.exec(html)) {
      if(match[1].indexOf('|') > -1) {
        let filters = match[1].split('|').map((filter) => filter.trim());
        let value = filters.shift();

        filters = filters.map((name) => {
          if(name.indexOf(':') === -1) {
            return {
              filter : Filters.get(name).render,
              value: null
            };
          } else {
            let filterValue = name.substring(name.indexOf(':') + 1);
            let filterName = name.substring(0, name.indexOf(':'));
            return {
              filter: Filters.get(filterName).render,
              value: filterValue
            };
          }
        });

        let filterName = filters::first();

        options['filter'] = filterName.filter;
        options['filterValue'] = filterName.value;
        
        add(html.slice(cursor, match.index))('this.filter' + '(this.' + value + ', this.filterValue)', true);
      } else {
        add(html.slice(cursor, match.index))('this.' + match[1], true);
      }
      cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';

    //console.log(code);
    //console.log(html);
    //console.log(new Function(code.replace(/[\r\t\n]/g, '')).apply(options));

    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
  }
}

Render.START_DELIMITER = "{{";
Render.END_DELIMITER = "}}";