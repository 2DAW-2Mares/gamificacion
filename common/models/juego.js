'use strict';

module.exports = function (Juego) {
  Juego.beforeRemote('create', function (context, juego, next) {
    context.args.data.creador = context.req.accessToken.userId;
    next();
  });
};
