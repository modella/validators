# Model Validators

A collection of validators for
[modella](https://github.com/MatthewMueller/modella).

## Basic Validators

### Required

Verifies that a field is present.

    var User = User.attr('username', {required: true});

### Type

Checks that a field is of a given type

    var User = User.attr('name', {type: 'string'});


## Format Validators

Verify the value of a field against a regex pattern. model-validators
comes with a few regex strings built in under the `formatStrings`
object.

### Format

Validates the field against the given regular expression

    var User = User.attr('name', {format: /\w+ \w+});


### Phone Number

Validates the field against a (North American) phone number format

    var User = User.attr('phone', {phoneFormat: true });


### Email Address

Validates the field against a email address format

    var User = User.attr('email', {emailFormat: true });

### URL

Validates the field against a URL format

    var User = User.attr('website', {urlFormat: true });
