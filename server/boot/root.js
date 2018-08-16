'use strict';

module.exports = function (server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  router.get('/verified', function (req, res) {
    res.render('verified');
  });

  server.use(router);
};
