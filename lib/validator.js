var ObjectSchema = require('./schema/objectSchema'),
    ArraySchema = require('./schema/arraySchema'),
    PrimitiveConstraint = require('./constraint/primitiveConstraint'),
    requireDir = require('require-dir');

function Validator(){
	this.constraints = {};
	this.bootstrap('./validations');
}

function isValidation(obj){
	return obj.name && obj.test;
}

Validator.prototype.bootstrap = function(directory){
	var dir = requireDir(directory, {recurse: true});
	for( var i in dir ){
		this.register( dir[i] );
	}
}

Validator.prototype.register = function(object){
	if( isValidation(object) ){
		this.registerConstraint(new PrimitiveConstraint(object));		
		if( object.derived ){
			this.register( object.derived );
		}
	}
	else{
		for( var i in object ){			
			this.register( object[i] );
		}
	}
}

Validator.prototype.registerConstraint = function(constraint){
	this.constraints[constraint.name] = constraint; 
}


Validator.prototype.Schema = function(config){	
	return new ObjectSchema(this, config);
}

Validator.prototype.arrayOf = function( schema ){
	return new ArraySchema(schema);
}

Validator.create = function(){
	return new Validator();
}

module.exports = Validator;
