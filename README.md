# hapi-trails

**hapi-trails** is a [Hapi](http://hapijs.com) plugin for logging to the Papertrail service. 

## About

This plugin is just a wrapper around the [winston-papertrail](https://github.com/kenperkins/winston-papertrail) library. It's only designed to make integrating with Hapi easier.

### Usage

Install **hapi-trails** with npm:

```bash
npm install hapi-trails --save
```

Register the plugin:

```javascript
server.register({
		register: require('hapi-trails'),
		options: {
			host: 'YOUR_PAPERTRAIL_HOST',
			port: 9999, // your papertrail port
			hostname: 'hostname' // the hostname you want to appear in the log
		}
	}, function (error) {
		// assert there's no error
		Hoek.assert(!error, error);
});

```

You can now log to Papertrail through `server.plugins['hapi-shelf']`. 

```javascript
server.route({
	method: 'GET',
	path:'/hello/{name}', 
	handler: function (request, reply) {
	    
		var logger = server.plugins['hapi-trails'];
	    
		logger.info(request.params.name + ' says hello');
	    
		return reply('hello ' + request.params.name);
	}
});
```

If you visit [http://localhost:8000/hello/matt](http://localhost:8000/hello/matt) you should see a message appear in your Papertrail log. 