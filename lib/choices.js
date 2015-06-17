module.exports = function choices(attr, choices) {
  return function(Model){
    Model.validate(function(model){
      var val = model.attrs[attr];
      if (!Array.isArray(choices)) {
        model.error(attr, 'choices should be an Array')
      }
      else if (val !== undefined && choices.indexOf(val) < 0) {
        model.error(attr, 'should be one of ' + [].slice.call(choices).join(', '));
      }
    });
  };
};
