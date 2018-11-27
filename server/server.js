'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var session = require('express-session');

var app = module.exports = loopback();

// Create an instance of PassportConfigurator with the app instance
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(loopback.token());

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// Enable http session
// TODO pasar secret a global-config.js
app.use(session({secret: 'keyboard cat'}));

// Load the provider configurations
var config = {};
try {
  config = require('../global-config.js');
} catch (err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}
// Initialize passport
passportConfigurator.init();

// Set up related models
passportConfigurator.setupModels({
  userModel: app.models.Usuario,
  userIdentityModel: app.models.UserIdentity,
  userCredentialModel: app.models.UserCredential
});
// Configure passport strategies for third party auth providers
for (var s in config.providers) {
  var c = config.providers[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
