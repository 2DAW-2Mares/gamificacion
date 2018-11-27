'use strict';

var GLOBAL_CONFIG = require('../global-config');

module.exports = {
  Email: {
    name: "Email",
    connector: "mail",
    transports: GLOBAL_CONFIG.email.transports
  }
};
