required = require('./lib/required');

module.exports = function(Model) {
  var attrs = Model.attrs;
  for(var attr in attrs) {
    if (attrs[attr].required)
      Model.use(required(attr));
  }
}
