required = require('./required');
type = require('./type');
format = require('./format');
unique = require('./unique');

module.exports = function(Model) {
  for(var attr in Model.attrs) {
    checkValidationsForAttr.call(Model, attr);
  }

  Model.on('attrAdded', checkValidationsForAttr);
};

function checkValidationsForAttr(attr) {
  var modelAttr = this.attrs[attr];
  if (modelAttr.required) {
    this.use(required(attr));
  }

  if (modelAttr.type) {
    this.use(type(attr, this.attrs[attr].type));
  }

  if (modelAttr.unique) {
    this.on('syncSet', function(sync) {
      this.use(unique(attr, sync.name));
    });
    var name = this._sync ? this._sync.name : undefined;
    this.use(unique(attr, name));
  }

  if (modelAttr.format) {
    if (typeof modelAttr.format === 'string') {
      if (modelAttr.format === 'email') {
        this.use(format(attr, exports.formatStrings.email, "is not a valid email address"));
      } else if (modelAttr.format === 'url') {
        this.use(format(attr, exports.formatStrings.url, "is not a valid url"));
      } else if (modelAttr.format === 'phone') {
        this.use(format(attr, exports.formatStrings.phoneNumber, "is not a valid phone number"));
      }
    } else {
      this.use(format(attr, modelAttr.format));
    }
  }
}

exports.formatStrings = {};
exports.formatStrings.email = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
exports.formatStrings.url = /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i;
exports.formatStrings.cc = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
exports.formatStrings.urlsafe = /^[^&$+,\/:=?@ <>\[\]\{\}\\^~%#]+$/;
exports.formatStrings.phoneNumber = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
