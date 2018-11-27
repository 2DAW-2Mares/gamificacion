'use strict';

module.exports = function (server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  router.get('/verified', function (req, res) {
    res.render('verified');
  });

  //show password reset form
  //TODO incluir la versión en la url de redirectUrl
  router.get('/reset-password', function (req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      redirectUrl: '/api/Usuarios/reset-password?access_token=' +
        req.accessToken.id
    });
  });

  server.use(router);
};
