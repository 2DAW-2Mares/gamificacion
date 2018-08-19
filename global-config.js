// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/*
 * Global configuration shared by components.
 */
'use strict';

var url = require('url');

var conf = {
  hostname: 'localhost',
  port: 3000,
  restApiRoot: '/api', // The path where to mount the REST API app
  legacyExplorer: false
};

// The URL where the browser client can access the REST API is available.
// Replace with a full url (including hostname) if your client is being
// served from a different server than your REST API.
conf.restApiUrl = url.format({
  protocol: 'http',
  slashes: true,
  hostname: conf.hostname,
  port: conf.port,
  pathname: conf.restApiRoot
});

// La Base de datos que utilizaremos en producción
conf.db = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gamificacion',
  name: "db",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connector: process.env.DB_CONNECTOR || 'mysql'
};

// La configuración para poder enviar emails
conf.email = {
  transports: [{
    type: "SMTP",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  }]
};

// Configura la autenticación con Google
// TODO probar con el módulo passport-google-oauth2
conf.providers = {
  googleDocente: {
    provider: "google",
    module: "passport-google-oauth",
    strategy: "OAuth2Strategy",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: url.format({
      protocol: 'http',
      slashes: true,
      hostname: conf.hostname,
      port: conf.port,
      pathname: "/auth/google/callback"
    }),
    authPath: "/auth/googleDocente",
    callbackPath: "/auth/google/callback",
    successRedirect: "/",
    scope: ["email", "profile"],
    authOptions: {
      prompt: "select_account",
      hd: "murciaeduca.es"
    }
  },
  googleAlumno: {
    provider: "google",
    module: "passport-google-oauth",
    strategy: "OAuth2Strategy",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: url.format({
      protocol: 'http',
      slashes: true,
      hostname: conf.hostname,
      port: conf.port,
      pathname: "/auth/google/callback"
    }),
    authPath: "/auth/googleAlumno",
    callbackPath: "/auth/google/callback",
    successRedirect: "/",
    scope: ["email", "profile"],
    authOptions: {
      prompt: "select_account",
      hd: "alu.murciaeduca.es"
    }
  }
};

module.exports = conf;
