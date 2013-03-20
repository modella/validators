var modella    = require('modella'),
    validators = require('../index.js'),
    expect     = require('expect.js');

it("gets applied to fields defined after use of plugin", function(done) {
  var LateUser = modella('user');
  LateUser.use(validators);
  LateUser.once('attrAdded', function() {
    expect(LateUser.validators).to.have.length(1);
    done();
  });

  LateUser.attr('test', {required: true });
});

describe("unique", function() {
  describe("with mongo", function() {
    it("sets the index", function(done) {
      var mongoMock = function(Model) {
        Model.index = function(attr, options) {
          expect(attr).to.be('username');
          expect(options).to.have.property('unique', true);
          done();
        };

        Model.useSync({name: 'mongo'});
      };

      var UniqueUser = modella('user').attr('username', { unique: true });
      UniqueUser.use(validators);
      UniqueUser.use(mongoMock);
    });
  });
});

describe("required", function() {
  var RequiredUser = modella('user').attr('email', { required: true });
  RequiredUser.use(validators);

  it("breaks #isValid() if the field is blank", function() {
    var user = new RequiredUser();
    expect(user.isValid()).to.be(false);
  });

  it("populates #errors() if the field is blank", function() {
    var user = new RequiredUser();
    user.validate();
    expect(user.errors).to.have.length(1);
    expect(user.errors[0]).to.have.property('attr', 'email');
    expect(user.errors[0]).to.have.property('message', 'field required');
  });

  it("does nothing if the field is present", function() {
    var user = new RequiredUser({email: 'test@gmail.com'});
    expect(user.isValid()).to.be(true);
  });
});

describe("type", function() {
  var TypeUser = modella('user').attr('email', { type: 'string' });
  TypeUser.use(validators);

  it("breaks #isValid() if the field is the wrong type", function () {
    var user = new TypeUser({email: 123});
    expect(user.isValid()).to.be(false);
  });

  it("populates #errors() if the field is the wrong type", function() {
    var user = new TypeUser({email: 123});
    user.validate();
    expect(user.errors).to.have.length(1);
    expect(user.errors[0]).to.have.property('attr', 'email');
    expect(user.errors[0]).to.have.property('message', 'should be a string');
  });

  it("does nothing if the field is the right type", function() {
    var user = new TypeUser({email: 'test@gmail.com'});
    expect(user.isValid()).to.be(true);
  });
});

describe("format", function() {
  var FormatUser = modella('user').attr('email', { format: /\w+@\w+\.com/ });
  FormatUser.use(validators);

  it("breaks #isValid() if the field does not match", function() {
    var user = new FormatUser({email: 'test'});
    expect(user.isValid()).to.be(false);
  });

  it("populates #errors() if the field does not match", function() {
    var user = new FormatUser({email: 'test'});
    user.validate();
    expect(user.errors).to.have.length(1);
    expect(user.errors[0]).to.have.property('attr', 'email');
    expect(user.errors[0]).to.have.property('message', 'does not match format');
  });

  it("does nothing if the field matches", function() {
    var user = new FormatUser({email: 'test@gmail.com'});
    expect(user.isValid()).to.be(true);
  });
});

describe("emailFormat", function() {
  var EmailFormatUser = modella('user').attr('email', { format: 'email' });
  EmailFormatUser.use(validators);

  it("breaks #isValid() if the field is not an email address", function() {
    var user = new EmailFormatUser({email: 'test'});
    expect(user.isValid()).to.be(false);
  });

  it("populates #errors() if the field is not an email address", function() {
    var user = new EmailFormatUser({email: 'test'});
    user.validate();
    expect(user.errors).to.have.length(1);
    expect(user.errors[0]).to.have.property('attr', 'email');
    expect(user.errors[0]).to.have.property('message', 'is not a valid email address');
  });

  it("does nothing if the field is an email address", function() {
    var user = new EmailFormatUser({email: 'test@gmail.com'});
    expect(user.isValid()).to.be(true);
  });
});

describe("urlFormat", function() {
  var UrlFormatUser = modella('user').attr('website', { format: 'url' });
  UrlFormatUser.use(validators);

  it("breaks #isValid() if the field is not a url", function() {
    var user = new UrlFormatUser({website: 'test'});
    expect(user.isValid()).to.be(false);
  });

  it("populates #errors() if the field is not a url", function() {
    var user = new UrlFormatUser({website: 'test'});
    user.validate();
    expect(user.errors).to.have.length(1);
    expect(user.errors[0]).to.have.property('attr', 'website');
    expect(user.errors[0]).to.have.property('message', 'is not a valid url');
  });

  it("does nothing if the field is a url", function() {
    var user = new UrlFormatUser({website: 'http://google.com'});
    expect(user.isValid()).to.be(true);
  });
});

describe("phoneFormat", function() {
  var PhoneFormatUser = modella('user').attr('phone', { format: 'phone' });
  PhoneFormatUser.use(validators);

  it("breaks #isValid() if the field is not a phone number", function() {
    var user = new PhoneFormatUser({phone: 'test'});
    expect(user.isValid()).to.be(false);
  });

  it("populates #errors() if the field is not a phone number", function() {
    var user = new PhoneFormatUser({phone: 'test'});
    user.validate();
    expect(user.errors).to.have.length(1);
    expect(user.errors[0]).to.have.property('attr', 'phone');
    expect(user.errors[0]).to.have.property('message', 'is not a valid phone number');
  });

  it("does nothing if the field is a phone number", function() {
    var user = new PhoneFormatUser({phone: '(608) 555-5108'});
    expect(user.isValid()).to.be(true);
  });
});
