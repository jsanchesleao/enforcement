var util = require('./util');


exports.validations = {


	string: {
		name: 'string',
		test: function(value){
			return util.testIfDefined(value, function(){ return value.constructor === String });
		},
		message: 'attribute %attr% is not a string: [%value%]'
	},

	number: {
		name: 'number',
		test: function(value){
			return util.testIfDefined(value, function(){ return value.constructor === Number });
		},
		message: 'attribute %attr% is not a number: [%value%]'
	},

	integer: {
		name: 'integer',
		test: function(value){
			return util.testIfDefined(value, function(){ 
				return value.constructor === Number && value % 1 === 0;
			});
		},
		message: 'attribute %attr% is not a number: [%value%]'
	},

	positive: {
		name: 'positive',
		test: function(value){
			return util.testIfDefined(value, function(){ return value.constructor === Number && value > 0 });
		},
		message: 'attribute %attr% is not a number: [%value%]'
	},

	negative: {
		name: 'negative',
		test: function(value){
			return util.testIfDefined(value, function(){ return value.constructor === Number && value < 0 });
		},
		message: 'attribute %attr% is not a number: [%value%]'
	},

	bool: {
		name: 'boolean',
		test: function(value){
			return util.testIfDefined(value, function(){ return value.constructor === Boolean });
		},
		message: 'attribute %attr% is not a boolean: [%value%]'
	},

	array: {
		name: 'array',
		test: function(value){
			return util.testIfDefined(value, function(){ return value.constructor === Array });
		},
		message: 'attribute %attr% is not an array: [%value%]'
	}


}