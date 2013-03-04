module.exports = function required(attr) {
  return function(Model){
    Model.validate(function(model){
      if (!model.has(attr)) model.error(attr, 'field required');
    });
  };
}
