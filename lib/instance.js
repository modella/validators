var is = require('../deps/instance');

module.exports = function instance(attr, type) {
  return function(Model){
    if ('function' !== typeof type) return;
    Model.validate(function(model){
      var val = model.attrs[attr];
      if (val === undefined) return;
      
      var valid = val.model ? val.model == type : is(val, type);
      if (!valid) {
        model.error(attr, "should be a " + type.name);
      }
    });
  };
};
