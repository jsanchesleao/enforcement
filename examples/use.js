var enforcement = require('../'),
	arrayOf = enforcement.arrayOf,
	Schema  = enforcement.Schema;

var integer = {
	name: 'integer',
	test: function(value){
		return value % 1 === 0;
	},
	message: 'Attribute %attr% is not an integer number'
}

var Product = Schema({
    sku: 'required string',
    name: 'required string',
    quantity: 'required number integer',
    tags: '[string notEmpty]',
    properties: arrayOf(Schema({
    	key: 'required string notEmpty',
    	value: 'required string'
    }))
});

Product.registerValidation(integer);


var prod = {
	sku: '123',
	name: 'test',
	quantity: 12,
	tags: ['123', 'asd'],
	properties: [{
		key: 'test',
		value: '123'
	}]
};

Product.check( prod );
