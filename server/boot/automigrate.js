module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('Juego', function(err) {
    if (err) throw err;

    app.models.Juego.create([{
      nombre: 'Uncharted',
      descripcion: 'El mejor juego de la historia',
      imagen:'imagen',
      grupal:'true'
    }, {
      nombre: 'Assassins creed',
      descripcion: 'El mejor juego de la historia',
      imagen:'imagen',
      grupal:'true'
    }, {
      nombre: 'GTA5',
      descripcion: 'El mejor juego de la historia',
      imagen:'imagen',
      grupal:'true'
    }], function(err, juegos) {
      if (err) throw err;

      console.log('Modelos creados: \n', juegos);
    });
  });
};