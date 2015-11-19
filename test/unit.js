/* unit.js
 *
 * Unit tests for hapi-trails. There's not really that much to test...
 */
var Hapi 		= require('hapi'),
    Code 		= require('code'),
    lab 		= exports.lab = require('lab').script(),
    HapiTrails	= require('../');
    
var describe = lab.describe,
    it = lab.it,
    before = lab.before,
    after = lab.after,
    expect = Code.expect;    
    
describe('hapi-trails', function() {
	
	var server = null;
	
	before(function(done) {
		server = new Hapi.Server();
		done();
	});
	
	after(function(done) {
		server.stop(function() {
			done();
		});
	});
	
	describe('registration', function() {
		
		it('registers the plugin with the required options', function(done) {
		
			server.register({
				register: HapiTrails,
				options: {
					host: 'host',
					port: 100
				}
			}, function(error) {
				expect(error).to.not.exist();
				expect(server.plugins['hapi-trails']).to.be.an.object();
				done();
			});
		});
	});
});