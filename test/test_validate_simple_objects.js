var assert = require('assert');
var validator = require('../lib/validator');

describe("Validator", function(){
	it('checks for simple types inside an object', function(){

		var validObj = {
			foo: 42
		};

		var schema = validator.Schema({
			foo: 'number'
		})

		schema.check(validObj);

	});

	it('throws an error if a validation fails', function(){
		var invalidObj = {
			foo: 42
		};

		var schema = validator.Schema({
			foo: 'string'
		})

		try{
			schema.check(invalidObj)
			assert.fail('object should not validate');
		}
		catch(err){
			assert.equal(err.message, 'attribute foo is not a string: [42]')
		}
	});

	it('throws error if an unknown validation is used', function(){
		var invalidObj = {
			foo: ''
		};

		var schema = validator.Schema({
			foo: 'exotic'
		})

		try{
			schema.check(invalidObj)
			assert.fail('object should not validate');
		}
		catch(err){
			assert.equal(err.message, 'validation [exotic] does not exist');
		}
	});

	it('chains validations in an array', function(){
		var invalidObj = {
			foo: ''
		};

		var schema = validator.Schema({
			foo: 'string notEmpty '
		})

		try{
			schema.check(invalidObj)
			assert.fail('object should not validate');
		}
		catch(err){
			assert.equal(err.message, 'attribute foo is empty')
		}
	});

	it('validates typed array fields', function(){
		var schema = validator.Schema({
			foo: '[string]'
		});

		var obj = {
			foo:['a', 'b']
		}

		schema.check( obj );
	});

	it('can use a schema as a validation for other schemas', function(){
		var custom = validator.Schema({
			bar: ['string', 'notEmpty']
		});
		var schema = validator.Schema({
			foo: custom
		});

		var valid = {
			foo: {
				bar: 'not empty string'
			}
		}

		schema.check(valid);

		try{
			var invalid = {
				foo: {
					bar: 12
				}
			};

			schema.check(invalid);
			assert.fail('should not validate');
		}
		catch(err){
			assert.equal(err.message, 'Error validating field [foo]: attribute bar is not a string: [12]');
		}

	});

	it('can use a schema as a validation for other schema with arrays', function(){
		var custom = validator.Schema({
			bar: 'required string notEmpty'
		});
		var schema = validator.Schema({
			foo: validator.arrayOf(custom)
		});

		var valid = {
			foo: [
				{ bar: 'not empty string'},
				{ bar: 'another string'}
			]
		}

		schema.check(valid);

		try{
			var invalid = {
				foo: [{}]
			};

			schema.check(invalid);
			assert.fail('should not validate');
		}
		catch(err){
			assert.equal(err.message, 'Error validating field [foo]: attribute bar is not defined');
		}
	});
})