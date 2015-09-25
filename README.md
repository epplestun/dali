# dali
ES6 framework for creating web applications.

##How to start

##Decorators
Decorators make it possible to annotate and modify classes and properties at design time.

###@Component
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

###@Runnable

###@View

###@Bindable