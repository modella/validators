module.exports = function(attr, confirmationField) {
  return function(Model) {
    Model.validate(function(model) {
      var val = model.attrs[attr],
          confirmsVal = model.attrs[confirmationField];

      if(confirmsVal !== val) {
        model.error(attr, "does not match " + confirmationField + " field");
      }
    });
  };
};
