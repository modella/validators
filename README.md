# Modella Validators
[![Build Status](https://secure.travis-ci.org/modella/validators.png?branch=master)](http://travis-ci.org/modella/validators)

A plugin that provides a bunch of validators for
[modella](https://github.com/modella/modella).

## Example Usage

```js
var Person     = modella('Person').attr('name', { required: true }),
    validation = require('modella-validators');
    
Person.use(validation);
```    

## Basic Validators

### Required

Verifies that a field is present.

```js
var User = User.attr('username', {required: true});
```

### Confirms

Verifies that a field equals another field.

```js
var User = User.attr('password')
               .attr('passwordConfirmation', { confirms: 'password' });
```

### Type

Checks that a field is of a given type

```js
var User = User.attr('name', {type: 'string'});
```

In addition to string support for primitives, you can also pass in a
constructor.

```js
var User = User.attr('parent', { type: User });
```

## Format Validators

Verify the value of a field against a regex pattern. `modella-validators`
comes with a few regex strings built in under the `formatStrings`
object.

### Format

Validates the field against the given regular expression

```js
var User = User.attr('name', {format: /\w+ \w+/ });
```

### Phone Number

Validates the field against a (North American) phone number format

```js
var User = User.attr('phone', {format: 'phone' });
```


### Email Address

Validates the field against a email address format

```js
var User = User.attr('email', {format: 'email' });
```

### URL

Validates the field against a URL format

```js
var User = User.attr('website', {format: 'url' });
```
