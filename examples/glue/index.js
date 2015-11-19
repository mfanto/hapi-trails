/* index.js
 *
 * This is a example of registering the hapi-trails plugin with Glue. If you're not using Glue, you 
 * can check out the basic example to see how to register the plugin. 
 * 
 * Routes are also loaded via a plugin, and can be found in routes.js
 */

var Hapi = require('hapi'),
    Hoek = require('hoek'),
    Glue = require('glue');
	
Glue.compose(require('./manifest.json'), { relativeTo: __dirname }, function(error, server) {
			
	Hoek.assert(!error, error);
				
		if (!module.parent) {
			
			var web = server.select('web');
			
			server.start(function () {
				console.log('Web running at: ' + web.info.uri);
			});
		}
	
	module.exports = server;	
});