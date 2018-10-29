'use strict';

module.exports = function (Juego) {
  /**
   * Devuelve el nombre de un Juego enviado como parámetro
   * @param {Function(Error, string)} callback
   */

  Juego.prototype.getNombre = function (callback) {
    var nombre = this.nombre;
    // TODO
    callback(null, nombre);
  };
  Juego.esgrupal = function (callback) {
    var juegos;
    Juego.find({ where: { grupal: true } }, function (err, juegos) {
      callback(null, juegos);
    });
  };
};

