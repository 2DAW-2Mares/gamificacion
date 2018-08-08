module.exports = function (app) {
  app.dataSources.mysqlDs.automigrate(null, function (err) {
    if (err) throw err;

    app.models.Juego.create([{
      nombre: 'Corro de la patata',
      descripcion: 'El mítico juego',
      grupal: true
    }, {
      nombre: 'Salto de la comba',
      descripcion: 'Otra forma de hacer ejercicio',
      grupal: false
    }, {
      nombre: 'La zapatilla por detrás',
      descripcion: '¿Quién la tendrá?',
      grupal: true
    }], function (err, juegos) {
      if (err) throw err;

      console.log('Models created: \n', juegos);
    });
  });
};
