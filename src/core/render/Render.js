export class Render {
  static normalize(html) {
    return html.replace(/\*(for|if|model)/gm, (p1, p2) => 'data-' + p2);
  }

  static render(html, options) {
    var re = /{{([^}}]+)?}}/g,
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