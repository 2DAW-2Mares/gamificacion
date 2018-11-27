'use strict';

var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "noreply@iesdosmares.com"; //Replace this address with your actual address

module.exports = function (Usuario) {
  //send verification email after registration
  Usuario.afterRemote('create', function (context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      subject: 'Gracias por registrarse.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: user
    };

    user.verify(options, function (err, response) {
      if (err) {
        Usuario.deleteById(user.id);
        return next(err);
      }
      context.res.render('response', {
        title: 'Registrado con éxito',
        content: 'Por favor, revise su email y pulse en el enlace de verificación ' +
          'antes de intentar el Login.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  //send password reset link when requested
  Usuario.on('resetPasswordRequest', function (info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">aqu&iacute;</a> para resetear la contrase&ntilde;a';

    Usuario.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function (err) {
      if (err) return console.log('> error enviando el email para resetear la contrase&ntilde;a');
      console.log('> enviando el email a:', info.email);
    });
  });

  //render UI page after password reset
  Usuario.afterRemote('setPassword', function (context, user, next) {
    context.res.render('response', {
      title: 'Contraseña actualizada con éxito',
      content: 'Contraseña actualizada con éxito',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

};
