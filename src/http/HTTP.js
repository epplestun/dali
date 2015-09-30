export class HTTP {
  static init(options = {method: 'GET', headers: {}, cache: false, async: false, timeout: 0}) {
    function toQueryString(obj) {
      var parts = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
      }
      return parts.join("&");
    }

    function appendQuery(url, query) {
      if (query == '') return url;
      return (url + '&' + query).replace(/[&?]{1,2}/, '?');
    }

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();

      if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);

      } else {
        xhr = null;
      }

      return xhr;
    }

    if (!options.url) {
      throw new Error("Url is needed");
    }

    if (options.params) {
      options.url = appendQuery(options.url, toQueryString(options.params));
    }

    if (options && options.data) {
      options.headers['Content-Type'] = (options.headers['Content-Type'] || 'application/x-www-form-urlencoded');
      var queryString = options.data ? toQueryString(options.data) : null;
      if (queryString) {
        options.headers["Content-length"] = queryString.length;
      }
    }

    if (options.cache) {
      options.url = appendQuery(options.url, '_=' + +new Date());
    }

    var promise = new Promise(function (resolve, reject) {
      var request = createCORSRequest(options.method, options.url);

      if (options && options.headers) {
        Object.keys(options.headers).forEach(function (key) {
          request.setRequestHeader(key, options.headers[key]);
        });
      }

      if (this.withCredentials) {
        request.withCredentials = true;
      }

      request.onload = function () {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject(new Error("Status code was " + request.status));
        }
      };
      request.onerror = function () {
        reject(new Error("Can't XHR " + JSON.stringify(options.url)));
      };

      if (options.timeout > 0) {
        var timeout = setTimeout(function () {
          xhr.onreadystatechange = function () {
          };
          xhr.abort();
          clearTimeout(timeout);
        }, options.timeout);
      }

      request.send(options && options.data ? toQueryString(options.data) : null);
    });

    return promise;
  }

  static get(url, options = {}) {
    options.method = 'GET';
    options.url = url;

    return this.init(options);
  }

  static post(url, options = {}) {
    options.method = 'POST';
    options.url = url;

    return this.init(options);
  }

  static put() {
    options.method = 'PUT';
    options.url = url;

    return this.init(options);
  }

  static delete() {
    options.method = 'DELETE';
    options.url = url;

    return this.init(options);
  }

  static head() {
    options.method = 'HEAD';
    options.url = url;

    return this.init(options);
  }

  static trace() {
    options.method = 'TRACE';
    options.url = url;

    return this.init(options);
  }

  static options() {
    options.method = 'OPTIONS';
    options.url = url;

    return this.init(options);
  }

  static patch() {
    options.method = 'PATCH';
    options.url = url;

    return this.init(options);
  }
}