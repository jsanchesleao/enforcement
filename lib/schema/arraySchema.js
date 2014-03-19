var util = require('util'),
    Schema = require('./schema'),
    constraintFactory = require('../constraint/constraintFactory');

function ArraySchema(schema){
	this.baseSchema = schema;
}

util.inherits(ArraySchema, Schema);

ArraySchema.prototype.check = function(value){	
	for( var i = 0; i < value.length; i++){
		var element = value[i];
		this.baseSchema.check( element );
	}
}

module.exports = ArraySchema;
