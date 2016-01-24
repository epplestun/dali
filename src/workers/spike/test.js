function HTTP() {
  this.worker = new Worker("worker.js");

  this.worker.addEventListener('message', function (e) {
    this.callback(e.data);
  }.bind(this), false);
}

HTTP.prototype.get = function (url, callback) {
  this.callback = callback;
  this.worker.postMessage({method: 'GET', url: url});
};


var http = new HTTP();

document.getElementById('b').addEventListener('click', function () {
  http.get('data.json', function (response) {
    console.log(response);
  });
}, false);