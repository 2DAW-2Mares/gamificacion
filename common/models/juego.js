'use strict';

module.exports = function (Juego) {
  Juego.beforeRemote('create', function (context, juego, next) {
    context.args.data.creador = context.req.accessToken.userId;
    next();
  });

  //TODO En el caso de unificar todas las imágenes en un modelo, trasladar esta validación al nuevo modelo
  Juego.validatesFormatOf('imagen', {with: '(http(s?):)|([/|.|\\w|\\s])*\\.(?:jpg|jpeg|gif|png|bmp|tiff|psd|svg)'});
};
