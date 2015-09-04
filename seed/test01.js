var System = require('systemjs');

System.config({
	baseURL: 'dist'
});

// loads /app/main.js
System.import('main.js');