var Type = require('../deps/type');

module.exports = function required(attr, type) {
  return function(Model){
    Model.validate(function(model){
      var val = model.attrs[attr];
      debugger;
      if(Type(val) !== type)
        model.error(attr, "should be a " + type);
    });
  };
}
