# dali
ES6 framework for creating web applications.

## Introduction
*dali* use [babel](https://babeljs.io) to compile ES6 code into ES5

## Installation
Dali is available on npm.
```shell
$ npm install dalijs
```

## Decorators
Decorators make it possible to annotate and modify classes and properties at design time.

### @Component

* Name

```javascript
import {Component} from 'dali/dali';

@Component({
    name : 'my-component'
})
class MyComponent {

}
```

### @Inject
```javascript
import {Inject, HTTP} from 'dali/dali';

@Inject(HTTP)
class MyComponent {
    constructor(http) {
        http.get('url').then((response) => {
            console.log(reponse);
        });
    }

}
```

### @Directive

* Name

```javascript
import {Directive} from 'dali/dali';

@Directive({
    name : 'my-directive'
})
class MyDirective {
    render(data, element, value) {
    }
}
```

### @Filter
```javascript
import {Filter} from 'dali/dali';

@Filter
export class JsonFilter {
  render(value) {
    return JSON.stringify(value);
  }
}
```

### @RouterConfig

* Title
* Default
* Path

```javascript
import {RouterConfig} from 'dali/dali';

@RouterConfig({
  title: 'Module 1',
  default: true,
  path : '/path'
})
```

### @Runnable

```javascript
import {Runnable} from 'dali/dali';

@Runnable
class Test {}
```

### @View

* Template
* TemplateURL

```javascript
import {View} from 'dali/dali';

@View({
  templateUrl: 'module1/module1_view.html'
})
class Test {
}
```

### @Bindable
```javascript
import {Bindable} from 'dali/dali';

class Test {
    @Bindable
    name;
}
```

More info and complete example in [Seed](https://github.com/epplestun/dali/tree/master/seed) project.

## License

(The MIT License)

Copyright (c) 2015 Iván Rodríguez <epplestun@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.