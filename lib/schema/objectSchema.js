var util = require('util'),
    Schema = require('./schema'),
    constraintFactory = require('../constraint/constraintFactory');

function ObjectSchema(validator, config){
	this.validator = validator;	
	this.constraints = constraintFactory.create(validator, config);
}

util.inherits(ObjectSchema, Schema);



ObjectSchema.prototype.check = function(obj){
	for(var i in this.constraints){
		var flaws = [];
		if( !this.constraints[i].test( obj[i], flaws ) ){
			this.sendError( flaws, i );
		}
	}
}

module.exports = ObjectSchema;