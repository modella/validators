# Model Validators

A plugin that provides a bunch of validators for
[modella](https://github.com/modella/modella).

## Example Usage

    var Person = modella('Person').attr('name', { required: true }),
        validation = require('modella-validators');
        
    Person.use(validation);
    

## Basic Validators

### Required

Verifies that a field is present.

    var User = User.attr('username', {required: true});

### Confirms

Verifies that a field equals another field.

    var User = User.attr('password')
                   .attr('passwordConfirmation', { confirms: 'password' });

### Type

Checks that a field is of a given type

    var User = User.attr('name', {type: 'string'});

## Format Validators

Verify the value of a field against a regex pattern. `modella-validators`
comes with a few regex strings built in under the `formatStrings`
object.

### Format

Validates the field against the given regular expression

    var User = User.attr('name', {format: /\w+ \w+/ });

### Phone Number

Validates the field against a (North American) phone number format

    var User = User.attr('phone', {format: 'phone' });


### Email Address

Validates the field against a email address format

    var User = User.attr('email', {format: 'email' });

### URL

Validates the field against a URL format

    var User = User.attr('website', {format: 'url' });
