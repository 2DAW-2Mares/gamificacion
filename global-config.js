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

module.exports = conf;

conf.db = {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'gamificacion',
    name: "db",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connector: process.env.DB_CONNECTOR || 'mysql'
  };