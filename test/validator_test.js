var modella    = require('modella'),
    validators = require('../index.js');

describe("required", function() {
  var User = modella('user').attr('email', { required: true })
  User.use(validators);

  it("breaks #isValid() if the field is blank", function() {
    var user = new User;
    user.isValid().should.eq(false);
  });

  it("populates #errors() if the field is blank", function() {
    var user = new User;
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('email');
    user.errors[0].message.should.eq('field required');
  });

  it("does nothing if the field is present", function() {
    var user = new User({email: 'test@gmail.com'});
    user.isValid().should.eq(true);
  });
});

describe("type", function() {
  var User = modella('user').attr('email', { type: 'string' })
  User.use(validators);

  it("breaks #isValid() if the field is the wrong type", function () {
    var user = new User({email: 123});
    user.isValid().should.eq(false);
  });

  it("populates #errors() if the field is the wrong type", function() {
    var user = new User({email: 123});
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('email');
    user.errors[0].message.should.eq('should be a string');
  });

  it("does nothing if the field is the right type", function() {
    var user = new User({email: 'test@gmail.com'});
    user.isValid().should.eq(true);
  });
});
