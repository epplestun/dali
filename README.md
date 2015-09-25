# dali
ES6 framework for creating web applications.

##Introduction
*dali* use [babel](https://babeljs.io) to compile ES6 code into ES5

##How to start

npm install dali

##Decorators
Decorators make it possible to annotate and modify classes and properties at design time.

###@Component

* Name

```javascript
import {Component} from 'dali/dali';

@Component({
    name : 'my-component'
})
class MyComponent {

}
```

###@Inject
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

###@Directive

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

###@Filter
```javascript
import {Filter} from 'dali/dali';

@Filter
export class JsonFilter {
  render(value) {
    return JSON.stringify(value);
  }
}
```

###@RouterConfig

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

###@Runnable

```javascript
import {Runnable} from 'dali/dali';

@Runnable
class Test {}
```

###@View

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

###@Bindable
```javascript
import {Bindable} from 'dali/dali';

class Test {
    @Bindable
    name;
}
```

More info and complete example in [Seed](https://github.com/epplestun/dali/tree/master/seed) project.