var http = require('http');
var fs = require('fs');
var content = require('./content')();

server = http.createServer(function(request, response){
	content.static_contents(request, response);
})

server.listen(8000);
console.log('Server running port 8000');