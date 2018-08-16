'use strict';

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

};
