required = require('./lib/required');
type = require('./lib/type');

module.exports = function(Model) {
  var attrs = Model.attrs;
  for(var attr in attrs) {
    if (attrs[attr].required)
      Model.use(required(attr));

    if (attrs[attr].type)
      Model.use(type(attr, attrs[attr].type));
  }
}
