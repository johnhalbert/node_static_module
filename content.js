var http = require('http');
var fs = require('fs');
var mime = require('./mime');

module.exports = function() {

	return {
			static_contents: function(request, response) {

				var dir = new String();
				var file = request.url.split('/');
				var file = file[file.length-1];
				if (file.indexOf('.') >= 0) {
					var dirIndex = request.url.indexOf(file);
					dir = request.url.slice(0, dirIndex);
					file = file.split('.');
					file = file[file.length-1];
					files = fs.readdir('.'+dir, function(err, files){
						if (files && mime[file]) {
							
							if (mime[file].indexOf('image') >= 0) {
								fs.readFile('.'+request.url, function(errors, contents){
									if (errors) {
										response.writeHead(404, {'Content-Type': 'text/html'});
										response.write('<h1>404 - File Not Found</h1>');
										response.end();
									} else {
										response.writeHead(200, {'Content-Type': mime[file]});
										console.log(mime[file]);
										response.write(contents);
										response.end();
									}
								});
							} else {
								fs.readFile('.'+request.url, 'utf8', function(errors, contents){
									if (errors) {
										response.writeHead(404, {'Content-Type': 'text/html'});
										response.write('<h1>404 - File Not Found</h1>');
										response.end();
									} else {
										response.writeHead(200, {'Content-Type': mime[file]});
										console.log(mime[file]);
										response.write(contents);
										response.end();
									}
								});
							}
							
						} else {
							response.writeHead(404, {'Content-Type': 'text/html'});
							response.write('<h1>404 - File Not Found</h1>');
							response.end();
						}
					});
				} else {
					files = fs.readdir('.'+request.url, function(err, files){
						if (files) {
							fs.readFile('.'+request.url, 'utf8', function(errors, contents){
								if (errors) {
									response.writeHead(404, {'Content-Type': 'text/html'});
									response.write('<h1>404 - File Not Found</h1>');
									response.end();
								} else {
									response.writeHead(200, {'Content-Type': 'text/html'});
									response.write(contents);
									response.end();
								}
							});
						} else {
							response.writeHead(404, {'Content-Type': 'text/html'});
							response.write('<h1>404 - File Not Found</h1>');
							response.end();
						}
					});
				}
			}
		}
	}
