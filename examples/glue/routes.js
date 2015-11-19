/* routes.js
 *
 * This is an example of using plugins for routes, and how to access 
 * hapi-trails from within your handler. 
 */

exports.register = function(server, options, next) {
	
	// get the web instance
	var web = server.select('web');
	
	// we registered hapi-trails in manfiest.json
	var log = server.plugins['hapi-trails'];
	
	// Add the route to the web instance only
	web.route({
		method: 'GET',
		path:'/hello/{name}', 
		handler: function (request, reply) {
			
			log.info(request.params.name + ' says hello');
			
			return reply('hello ' + request.params.name);
		}
	});
	
	next();
}

exports.register.attributes = {
	name: 'example-routes', 
	version: '1.0.0'
};