import {bootstrap, Inject, Component, View} from 'dali/dali';
import {Service} from 'Service';

import {M1} from 'm1/m1';
import {M2} from 'm2/m2';

@Component({
  name : 'app'
})
@View({
  template : '<h1>App</h1>'
})
@Inject(M1, M2)
class App {
  constructor(m1, m2) {
    this.m1 = m1;
    this.m2 = m2;
  }

  run() {
    let modules = [
      this.m1,
      this.m2
    ];

    modules.forEach((module) => {
      if(!!module.config)
        module.config()
    });

    //modules.forEach((module) => module.run());
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