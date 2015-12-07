import {EventBus} from '../event/EventBus';

export class Router {
  static routes = [];

  static getHash() {
    return window.location.hash.substring(1);
  }

  static exists() {
    let routes = Router.routes.filter((route) => {
      let {path} = route.value;

      if (!!path.test(Router.getHash())) {
        return route;
      }
    });

    return routes.length === 1;
  }

  static route() {
    Router.routes.forEach((route) => {
      let {path} = route.value;

      if (!!path.test(Router.getHash())) {
        EventBus.publish(Router.ROUTE_CHANGED, route);
      }
    });
  }

  static routeTo(route) {
    window.location.hash = route.value.url;
  }

  static routeToDefault() {
    Router.routes.forEach((route) => {
      if(!!route.value.hasOwnProperty('default')) {
        window.location.hash = route.value.url;
      }
    });
  }

  static load() {
    let history = window.location.hash;
    window.location.hash = '#' + +new Date();
    window.location.hash = history;
  }

  static run() {
    if (window.location.hash.length === 0) {
      Router.routeToDefault();
    }

    window.addEventListener('hashchange', Router.route, false);
    window.addEventListener('load', Router.load, false);
  }
}

Router.ROUTE_CHANGED = "ROUTE_CHANGED";