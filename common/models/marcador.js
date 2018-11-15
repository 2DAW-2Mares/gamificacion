'use strict';

module.exports = function (Marcador) {
    Marcador.validateAsync('puntos', validacionMaximoPuntosFunction, {message: 'Se ha superado el límite de puntos para la prueba'});

    function validacionMaximoPuntosFunction(err, done) {
        var Prueba = Marcador.app.models.Prueba;
        var esteMarcador = this;
        Prueba.findById(esteMarcador.pruebaId, function (errorFind, prueba) {
            if (errorFind)
                throw(errorFind);
            if (esteMarcador.puntos > prueba.maximo) {
                err();
            }
            done();
        });
    }
    ;

}