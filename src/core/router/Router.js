import {Injector} from 'core/di/Injector';

export class Router {
  static routes = [];

  static getHash() {
    return window.location.hash.substring(1);
  }

  static route() {
    Router.routes.forEach((route) => {
      let {path} = route.value;

      if(!!path.test(Router.getHash())) {
        Injector.get(route.target).run();
      }
    });
  }

  static run() {
    window.addEventListener('hashchange', Router.route, false);
  }
}