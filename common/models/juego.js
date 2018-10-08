'use strict';

module.exports = function(Juego) {
Juego.prototype.getName = function(callback) {
  var nombre = this.nombre;
  // TODO
  callback(null, nombre);
};
};


