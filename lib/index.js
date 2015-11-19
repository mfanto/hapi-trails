/* index.js
 *
 * This is the main hapi-trails plugin. Messages are logged through the 
 * winston-papertrail library, and configuration options are validated
 * with Joi. 
 * 
 * You only need to set the host and port. 
   See https://github.com/kenperkins/winston-papertrail for an explanation of each option
 */

var Joi		= require('joi'),
    winston 	= require('winston'),
    papertrail	= require('winston-papertrail').Papertrail;
    
var internals = {};

internals.optionsSchema = Joi.object().keys({
	
	// required
	host: Joi.string().required(),
	port: Joi.number().required(),
	
	// optional
	disableTls: Joi.boolean(),
	level: Joi.string(),
	hostname: Joi.string(),
	program: Joi.string(),
	facility: Joi.string(),
	colorize: Joi.boolean(),
	inlineMeta: Joi.boolean(),
	handleExceptions: Joi.boolean(),
	 
	// connection options
	attemptsBeforeDecay: Joi.number(),
	maximumAttempts: Joi.number(),
	connectionDelay: Joi.number(),
	maxDelayBetweenReconnection: Joi.number(),
	maxBufferSize: Joi.number(),
});

exports.register = function(server, options, next) {

	// validate the options
	Joi.assert(options, internals.optionsSchema, 'Invalid options');
	
	var logger = new winston.Logger({
		transports: [
			new winston.transports.Papertrail(options)
		]
	});
	
	server.expose(logger);

	next();
}

exports.register.attributes = {
	pkg: require('../package.json')
};