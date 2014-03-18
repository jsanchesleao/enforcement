Enforcement
=========

Enforcement is yet another tool for validating your javascript object.
It's minimalistic and made to be extensible

Installation
------------

```sh
    npm install enforcement
```

Quickstart
----------

```javascript
    var enforcement = require('enforcement');

    var Person = enforcement.Schema({
        name: 'string',
        age: 'number'
    });

    var myPersonObject = {
        name: 'jeff',
        age: 22
    }

    Person.check(myPersonObject);
```

Defining Schemas
-----------------

To create a schema, use the <code>enforcement.Schema()</code> method. It accepts a schema definition and builds the validation.

The schema definition is a hash with the name of the fields as keys and the validations as values.

You can combine validations like the following:

```javascript
    var mySchema = enforcement.Schema({
        aField: 'required string',
        another: ['required', 'number']
    });
```

You can use an array with the names of the constraints or combine them into a space separated string.


Nested Schemas
--------------

You can use schemas as validations for fields inside other schemas too. Consider you want to validate objects with the following format:

```javascript
    {
        name: 'my name',
        age: 50,
        address:{
            street: 'some street',
            number 12
        }
    }
```

Here we want to validate a subdocument containing two fields, a string and a number. We can do this using a schema inside another, like this:

```javascript
    var schema = enforcement.Schema({
        name: 'required string',
        age: 'positive integer',
        address: enforcement.Schema({
            street: 'required string',
            number: 'required positive integer'
        })
    })
```

Array Types
-----------
A field can be defined as an array. You can, then, define validations to run through an array field. For example, to validate an array of string that cannot be empty, you can write the following schema:

```javascript
    var schema = enforcement.Schema({
        tags: '[string notEmpty]' //write the definition between square brackets to define that tags field is an array
    })

    schema.check({
        tags: ['abc', '']
    }); //this will not validate because the second string won't pass notEmpty constraint
```

Supported Validations
----------
- string
- boolean
- number
- integer
- positive
- negative
- notEmpty
- required
- array


Custom Validations
------------------
TODO: write doc