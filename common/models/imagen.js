'use strict';

module.exports = function (Imagen) {

  Imagen.validatesFormatOf('url', {with: '(http(s?):)|([/|.|\\w|\\s])*\\.(?:jpg|jpeg|gif|png|bmp|tiff|psd|svg)'});

};
