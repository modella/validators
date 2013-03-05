module.exports = function format(attr, regex, message) {
  message = message || "does not match format"
  return function(Model) {
    Model.validate(function(model) {
      var val = model.attrs[attr];

      if(val && !regex.test(val))
        model.error(attr, message);
    });
  }
}
