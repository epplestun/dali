import {Directives} from 'core/directives/Directives';

export class Render {
  
  static normalize(html) {
    let coreDirectives = [];
    for(let directive in Directives.getDirectives()) {
      coreDirectives.push(directive.replace(Directives.PREFIX, ''));
    }

    let pattern = '\\*(' + coreDirectives.join('|') + ')';
    let regExp = new RegExp(pattern, "gm");

    return html.replace(regExp, (p1, p2) => Directives.PREFIX + p2);
  }

  static render(html, options) {
    var re = new RegExp(Render.START_DELIMITER + '([^' + Render.END_DELIMITER + ']+)?' + Render.END_DELIMITER, 'g'),
    //reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
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
      add(html.slice(cursor, match.index))('this.' + match[1], true);
      cursor = match.index + match[0].length;
    }

    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';

    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
  }

  static getDOM(parent) {
    let nodes = parent.childNodes[0].childNodes[1].childNodes;

    console.log(nodes);

    return nodes;
  }
}

Render.START_DELIMITER = "{{";
Render.END_DELIMITER = "}}";