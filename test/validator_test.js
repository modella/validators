var modella    = require('modella'),
    validators = require('../index.js');

describe("required", function() {
  var requiredUser = modella('user').attr('email', { required: true })
  requiredUser.use(validators);

  it("breaks #isValid() if the field is blank", function() {
    var user = new requiredUser;
    user.isValid().should.eq(false);
  });

  it("populates #errors() if the field is blank", function() {
    var user = new requiredUser;
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('email');
    user.errors[0].message.should.eq('field required');
  });

  it("does nothing if the field is present", function() {
    var user = new requiredUser({email: 'test@gmail.com'});
    user.isValid().should.eq(true);
  });
});

describe("type", function() {
  var typeUser = modella('user').attr('email', { type: 'string' })
  typeUser.use(validators);

  it("breaks #isValid() if the field is the wrong type", function () {
    var user = new typeUser({email: 123});
    user.isValid().should.eq(false);
  });

  it("populates #errors() if the field is the wrong type", function() {
    var user = new typeUser({email: 123});
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('email');
    user.errors[0].message.should.eq('should be a string');
  });

  it("does nothing if the field is the right type", function() {
    var user = new typeUser({email: 'test@gmail.com'});
    user.isValid().should.eq(true);
  });
});

describe("format", function() {
  var formatUser = modella('user').attr('email', { format: /\w+@\w+\.com/ });
  formatUser.use(validators);

  it("breaks #isValid() if the field does not match", function() {
    var user = new formatUser({email: 'test'});
    user.isValid().should.eq(false)
  });

  it("populates #errors() if the field does not match", function() {
    var user = new formatUser({email: 'test'});
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('email');
    user.errors[0].message.should.eq('does not match format');
  });

  it("does nothing if the field matches", function() {
    var user = new formatUser({email: 'test@gmail.com'});
    user.isValid().should.eq(true);
  });
});

describe("email_format", function() {
  var emailFormatUser = modella('user').attr('email', { email_format: true });
  emailFormatUser.use(validators);

  it("breaks #isValid() if the field is not an email address", function() {
    var user = new emailFormatUser({email: 'test'});
    user.isValid().should.eq(false)
  });

  it("populates #errors() if the field is not an email address", function() {
    var user = new emailFormatUser({email: 'test'});
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('email');
    user.errors[0].message.should.eq('is not a valid email address');
  });

  it("does nothing if the field is an email address", function() {
    var user = new emailFormatUser({email: 'test@gmail.com'});
    user.isValid().should.eq(true);
  });
});

describe("url_format", function() {
  var urlFormatUser = modella('user').attr('website', { url_format: true });
  urlFormatUser.use(validators);

  it("breaks #isValid() if the field is not a url", function() {
    var user = new urlFormatUser({website: 'test'});
    user.isValid().should.eq(false)
  });

  it("populates #errors() if the field is not a url", function() {
    var user = new urlFormatUser({website: 'test'});
    user.isValid();
    user.errors.length.should.eq(1);
    user.errors[0].attr.should.eq('website');
    user.errors[0].message.should.eq('is not a valid url');
  });

  it("does nothing if the field is a url", function() {
    var user = new urlFormatUser({website: 'http://google.com'});
    user.isValid().should.eq(true);
  });
});
