'use strict';

module.exports = function(Juego) {
    /**
     * Devuelve el nombre de un Juego enviado como parámetro
     * @param {Function(Error, string)} callback
     */

    Juego.prototype.getNombre = function(callback) {
      var nombre = this.nombre;
      // TODO
      callback(null, nombre);
    };



    Juego.beforeRemote('create', function(ctx, user, next) {
      ctx.args.data.creador = ctx.req.accessToken.userId;
      next();
    });
    
    Juego.validatesFormatOf('name', {with: '(http(s?):)|([/|.|\\w|\\s])*\\.(?:jpg|jpeg|gif|png|bmp|tiff|psd|svg)'});
};
