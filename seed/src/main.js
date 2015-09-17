import {
  bootstrap, 
  Inject, 
  Component, 
  View, 
  Bindable,
  Runnable
} from 'dali/dali';

@Component({
  name : 'app'
})
@View({
  template : '<h1>{{value}} <strong>{{name}}</strong></h1><br/><button _click="start()">Start</button> - <button _click="stop()">Stop</button><p>App test</p>',
  bindable: true
})
@Runnable
class App { 
  
  @Bindable
  get value() { return this._value; };
  set value(value) { this._value = value; };

  @Bindable
  get name() { return this._name; }
  set name(name) { this._name = name; }
  
  constructor() {
    this.value = 0;
    this.name = "My first App!";
  } 
  
  start() {
    this.value = this.value + 1;
    this.name = "start!!!";
  }

  stop() {
    this.value = 0;
    this.name = "stop!!!";
  }
}

bootstrap(App);

/*
@Component({
	template:''
})
class Todo {
	constructor() {}
}
*/

/*
@Filter({
	name: 'filterName'
})
class FilterName {
	transform(value) {

	}
}
*/

/*
@View({
 templateUrl: '',
 filters: [FilterName]
})
*/

/*
@Component({
	tag: 'tabs',
	attributes: []
});
*/

/*
@Inject(Target)
*/

/*
@Route({

})
*/

//- login.html
//<login></login>

/*

//- login
@Router({
  name : 'login',
  path : '/login'
})
class LoginRouter {
  onEnter() {
  }

  onExit() {
  }
}

@Component({
  tag : 'login',
  attributes : []
})
class LoginComponent {}

@View({
  templateUrl : 'login.html',
  filters : []
})
class LoginView {}


@Module({
  router: LoginRouter,
  component: LoginComponent,
  view: LoginView
})
@Inject(Log)
class Login {
  constructor(log) {
    this.log = log;
  }

  config() {
    this.log.debug('configuring Login');
  }

  run() {
    this.log.debug('running Login');
  }
}

bootstrap(Login);

// Analysis.js
class Analysis {}

// EndUses.js
class EndUses {}

// LeakFinder.js
class LeakFinder {}

import {Analysis} from 'analysis/Analysis';
import {EndUses} from 'end-uses/EndUses';
import {LeakFinder} from 'leak-finder/LeakFinder';

@Inject(Analysis, EndUses, LeakFinder)
class BuntBrain {
  constructor(analysis, endUses, leakFinder) {
    this.analysis = analysis;
    this.endUses = endUses;
    this.leakFinder = leakFinder;
  }

  run() {
    let modules = [
      this.analysis,
      this.endUses,
      this.leakFinder
    ];

    modules.forEach((module) => module.config());
    modules.forEach((module) => module.run());
  }
}

bootstrap(BuntBrain);



@Inject(Service)
class main {
	constructor(service) {
		this.service = service;
	}

	run() {
		console.log('My test app');
		this.service.get();
	}
}

bootstrap(main);































function RouterConfig(...values) {
  return function(target) {
    var name = target.name;

    Router.configs.push({
      name,
      values
    });
  }
}

function Inject(...values) {
  return function(target) {
    target.dependecies = values;
  }
}

class Router {
  static configs = [];
  static init() {
    console.log(Router.configs);

    window.addEventListener('onhashchange', () => {
      console.log(arguments);
  }, false);
}
}

function bootstrap(target) {
  Router.init();
}


@RouterConfig({
  path : '/m1'
})
class M1 {
  constructor() {
    console.log('m1');
  }
}

@RouterConfig({
  path : '/m2'
})
class M2 {
  constructor() {
    console.log('m2');
  }
}


@Inject(M1, M2)
class App {
  constructor(m1, m2) {
    console.log(m1, m2)
  }
}


bootstrap(App);

*/