const ObjectSchema = require('./schema/objectSchema')
const ArraySchema = require('./schema/arraySchema')
const PrimitiveConstraint = require('./constraint/primitiveConstraint')

const notEmpty = require('./validations/notEmpty');
const primitives = require('./validations/primitives');
const required = require('./validations/required');

class Validator {
	constructor() {
		this.constraints = {};
		this.register(notEmpty);
		this.register(primitives);
		this.register(required);
	}

	registerConstraint(constraint) {
		this.constraints[constraint.name] = constraint; 
	}
	
	
	Schema(config) {	
		return new ObjectSchema(this, config);
	}
	
	arrayOf(schema) {
		return new ArraySchema(schema);
	}

	register(object) {
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

}

function isValidation(obj){
	return obj.name && obj.test;
}

Validator.create = function(){
	return new Validator();
}

module.exports = Validator;
