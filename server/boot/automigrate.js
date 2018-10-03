module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate(null, function(err) {
    if (err) throw err;

    app.models.Juego.create([{
      nombre: 'Gallinita Ciega',
      descripcion: 'Encontrar a uno de los participantes',
      grupal: true
    }, {
      nombre: 'Ajedrez',
      descripcion: 'Comer fichas',
      grupal: false
    }, {
      nombre: 'La hora del código',
      descripcion: 'A programar como locos',
      grupal: false
    }], function(err, juegos) {
      if (err) throw err;

      console.log('Models created: \n', juegos);
    });
  });
};
