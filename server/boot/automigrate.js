module.exports = function (app) {
  if (process.env.AUTOMIGRATE === "true") {
    app.dataSources.db.automigrate(null, function (err) {
      if (err) throw err;
      console.log("Modelos creados");
      app.loadFixtures()
        .then(function () {
          insertaCoordinadores(app);
        })
        .catch(function (err) {
          console.log('Errors:', err);
        });
    });
  }
};

function insertaCoordinadores(app) {
  app.models.Juego.find({}, function (err, juegos) {
    let coordinadores = juegos.map((juego) => {
      console.log(juego);
      return new Promise((resolve) => {
        console.log('Llamando a add con id: ' + juego.id);
        juego.coordinadores.add(juego.id, resolve);
      });
    });

    Promise.all(coordinadores).then(() => console.log('Datos cargados correctamente!'));
  })

}
