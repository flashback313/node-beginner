var fs = require('fs'),
	path = require('path'),
	http = require('http');


var MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};


function combineFiles(pathnames, callback) {
	var output = [];

	(function next(i, len) {
		fs.readFile
	})
}