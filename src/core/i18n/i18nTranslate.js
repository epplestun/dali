export class i18nTranslate {
  static from(map, path) {
    return new i18nTranslate(map, path);
  }

  constructor(map, path) {
    this.map = map;
    this.path = path;
  }

  index(obj, is, value) {
    if (typeof is == 'string')
      return this.index(obj, is.split('.'), value);
    else if (is.length === 1 && value !== undefined)
      return obj[is[0]] = value;
    else if (is.length === 0)
      return obj;
    else
      return this.index(obj[is[0]], is.slice(1), value);
  }

  isZero(input) {
    return input === 0;
  }

  isOne(input) {
    return input === 1;
  }

  isGreaterThanOne(input) {
    return input > 1;
  }

  plural(value, opts) {
    let output;

    if(!!this.isZero(value)) {
      let [, v] = /=0 \{(.*?)\}/ig.exec(opts);
      output = v.trim();
    }

    if(!!this.isOne(value)) {
      let [, v] = /=1 \{(.*?)\}/ig.exec(opts);
      output = v.trim();
    }

    if(!!this.isGreaterThanOne(value)) {
      let [, v] = /other \{(.*?)\}/ig.exec(opts);
      output = v.trim().replace('#', value);
    }

    return output;
  }

  isMale(input) {
    return input.toLowerCase() === 'male';
  }

  isFemale(input) {
    return input.toLowerCase() === 'female';
  }

  gender(value, opts) {
    let output;

    if(!!this.isMale(value)) {
      let [, v] = /male \{(.*?)\}/ig.exec(opts);
      output = v.trim();
    } else if(!!this.isFemale(value)) {
      let [, v] = /female \{(.*?)\}/ig.exec(opts);
      output = v.trim();
    } else {
      let [, v] = /other \{(.*?)\}/ig.exec(opts);
      output = v.trim();
    }

    return output;
  }

  translate(values) {
    let value = this.index(this.map, this.path),
        match,
        re = new RegExp("{{(.*)?}}", "g");

    if(!!values) {
      while(match = re.exec(value)) {
        let [variable, callback, options] = match[1].split(',');
        value = this[callback.trim()].call(this, values[variable], options.trim());
      }
    }    

    return value;
  }
}
