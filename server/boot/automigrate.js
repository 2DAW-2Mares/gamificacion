var GLOBAL_CONFIG = require('../../global-config');

module.exports = function (app) {
  if (process.env.AUTOMIGRATE === "true") {
    app.dataSources.db.automigrate(null, function (err) {
      if (err) throw err;
      console.log("Modelos creados");
      app.loadFixtures()
        .then(function () { console.log('Creando roles');
            insertaRoles(app.models, function (err, roles) {
                if (err)
                    throw(err);
                console.log(roles);
                insertaAdmin(app.models, roles[0], function (err) {
                    if (err)
                        throw(err);
                    insertaCoordinadores(app);
                });
            });
        })
        .catch(function (err) {
          console.log('Errors:', err);
        });
    });
  }
};

function insertaRoles(models, cb) {
    models.Role.create([
            {name: 'admin'},
            {name: 'docente'},
            {name: 'alumno'}
    ]
    , function (err, roles) {
            return cb(err, roles);

    });
}


function insertaAdmin(models, rolAdmin, cb) {
    models.Usuario.create(
            {
                username: 'Admin',
                email: GLOBAL_CONFIG.adminCredentials.email,
                password: GLOBAL_CONFIG.adminCredentials.password,
                emailVerified: true
            }
    , function (err, usuario) {
        if (err)
            return cb(err);

            //asociar el rol admin
            rolAdmin.principals.create({
                principalType: models.RoleMapping.USER,
                principalId: usuario.id
            }, function (err, principal) {
                cb(err);
            });
    });
}

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

