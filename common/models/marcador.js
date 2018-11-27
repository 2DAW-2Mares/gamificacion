'use strict';

module.exports = function (Marcador) {

  Marcador.validateAsync('puntos', puntosMenorIgualMaximo, {message: 'Los puntos superan el máximo para esta prueba'});

  function puntosMenorIgualMaximo(err, done) {
    let Prueba = Marcador.app.models.Prueba;
    let self = this;
    Prueba.findById(this.pruebaId, function (error, prueba) {
      if (self.puntos > prueba.maximo) err();
      done();
    })
  }
};
