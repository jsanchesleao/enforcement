var ObjectSchema = require('./schema/objectSchema'),
    ArraySchema = require('./schema/arraySchema'),
    PrimitiveConstraint = require('./constraint/primitiveConstraint');

function Validator(){
	this.constraints = {};
	this.bootstrap(__dirname + '/validations');
}

function isValidation(obj){
	return obj.name && obj.test;
}

Validator.prototype.bootstrap = function(directory){
	var fs = require('fs');
	var dir = fs.readdirSync(directory);

	var self = this;

	dir.forEach(function(file){
		self.register(require(directory + '/' + file));
	})
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
