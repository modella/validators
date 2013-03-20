module.exports = function unique(attr, type) {
  return function(Model) {
    switch(type) {
      case 'mongo':
        Model.index(attr, { unique: true});
    }
  };
};
