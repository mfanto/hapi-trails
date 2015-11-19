/* index.js
 *
 * This is a basic example of using the hapi-trails plugin with Hapi. If you're using Glue,
 * you can check out the glue example to see how to register this plugin
 */

var Hapi = require('hapi'),
    Hoek = require('hoek');

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Register the hapi-trails plugin
server.register({
		register: require('hapi-trails'),
		options: {
			host: 'YOUR_PAPERTRAIL_HOST',
			port: 9999, // your papertrail port
			hostname: 'Basic' // the hostname you want to appear in the log
		}
	}, function (error) {
		// assert there's no error
		Hoek.assert(!error, error);
});

// Add the route
server.route({
	method: 'GET',
	path:'/hello/{name}', 
	handler: function (request, reply) {
	    
		// the plugin is now available at
		var log = server.plugins['hapi-trails'];
	    
		log.info(request.params.name + ' says hello');
	    
		return reply('hello ' + request.params.name);
	}
});

// Start the server
server.start(function(error) {

	// assert there's no error
	Hoek.assert(!error, error);
    
	console.log('Server running at:', server.info.uri);
});