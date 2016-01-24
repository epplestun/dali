self.addEventListener('message', function (e) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    self.postMessage(this.responseText);
  });
  xhr.overrideMimeType("text/json; charset=UTF8");
  xhr.open(e.data.method, e.data.url);
  xhr.send();
}, false);