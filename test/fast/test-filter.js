var common = require('../common');
var assert = require('assert');
var sinon = require('sinon');

var Airbrake = require(common.dir.root);

(function testAddingFilter() {
  var airbrake = Airbrake.createClient(null, common.key, 'dev');
  sinon.stub(airbrake, '_sendRequest');

  airbrake.addFilter(function(err) {
    if (err.errors[0].message === 'this should not be posted to airbrake') {
      return null;
    }
    return err;
  });

  airbrake.notify(new Error('this should not be posted to airbrake'));

  assert.ok(!airbrake._sendRequest.called);

  airbrake.notify(new Error('this should be posted to airbrake'));

  assert.ok(airbrake._sendRequest.called);

  airbrake._sendRequest.restore();
}());
