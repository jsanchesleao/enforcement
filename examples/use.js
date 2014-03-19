var validator = require('../').create();

validator.register({
	name: 'integer',
	test: function(value){
		return value % 1 === 0;
	},
	message: 'Attribute %attr% is not an integer number'
});

var Product = validator.Schema({
    sku: 'required string',
    name: 'required string',
    quantity: 'required number integer',
    tags: '[string notEmpty]',
    properties: validator.arrayOf(validator.Schema({
    	key: 'required string notEmpty',
    	value: 'required string'
    }))
});


var prod = {
	
	name: 'test',
	quantity: 12,
	tags: ['123', 'asd'],
	properties: [{
		key: 'test',
		value: '123'
	}]
};

Product.check( prod );
