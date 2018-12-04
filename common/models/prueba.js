'use strict';

module.exports = function (Prueba) {
  
  Prueba.prototype.juegoAlQuePertenece = function(cb){
      this.juego(function(err, juego){
        cb(err, juego); 
      }); 
  };
  
};
