var requireDir = require('require-dir')
var util = require('util');

function isValidation(obj){
	return obj.name && obj.test && obj.message;
}


function Schema(options){
	Object.defineProperties(this, {
		options: {
			value: options,
			enumerable: true,
			configurable: false
		},
		validations: {
			value: {},
			enumerable: false, 
			configurable: true
		}
	})

	this.bootstrap('./validations')
}

Schema.prototype.registerValidation = function(validation){
	if( isValidation(validation) ){
		this.validations[validation.name] = validation 
		if( validation.derived ){
			this.registerValidation( validation.derived );
		}
	}
	else{
		for( var i in validation ){			
			this.registerValidation( validation[i] );
		}
	}
}

Schema.prototype.bootstrap = function(directory){
	var dir = requireDir('./validations', {recurse: true});
	for( var i in dir ){
		this.registerValidation( dir[i] );
	}
}

Schema.prototype.check = function(obj){
	if( typeof(obj) != 'object' ){
		throw Error( '[' + obj + '] is not an object');		
	}
	for(var i in this.options){
		var type = this.options[i];
		if( type.constructor === Array ){
			for( var j = 0; j < type.length; j++){
				this.executeValidation( type[j], obj, i );
			}
		}
		else{
			this.executeValidation( type, obj, i)
		}
		var validation = this.validations[type];
		

	}
	return true;
}

Schema.prototype.executeValidation = function(validation, obj, field){

	if( validation instanceof Schema ){
		this.executeSchemaValidation(validation, obj, field);
	}
	else{
		if( this.isArrayValidation(validation) ){
			var validations = this.getValidationName(validation).split(/\s+/);
			for( var i = 0; i < validations.length; i++){
				try{
					this.executeSimpleArrayValidation(validations[i], obj, field);
				}
				catch(err){
					throw Error('Error validating array: ' + err.message);
				}
			}
		}
		else{
			var validations = validation.split(/\s+/);
			for( var i = 0; i < validations.length; i++){
				this.executeSimpleValidation(validations[i], obj, field);
			}
		}
	}

}

Schema.prototype.executeSimpleValidation = function(validation, obj, field){	
	var validationObj = this.validations[validation];


	if( typeof validationObj === 'undefined' ){
		throw Error('validation ['+ validation +'] does not exist')
	}
	else if( !validationObj.test(obj[field]) ){
		this.throwInvalidError( validationObj, obj, field );
	}
}

Schema.prototype.throwInvalidError = function(validation, obj, field){
	var message = validation.message.replace(/%attr%/g, field).replace(/%value%/g, obj[field])
	throw Error(message);
}

Schema.prototype.isArrayValidation = function(validation){
	return validation.constructor === Array || validation.match(/^\[.*?\]$/);
}

Schema.prototype.getValidationName = function(validation){
	if( validation.constructor === Array ){
		return validation[0];
	}
	var match = validation.match(/^\[(.*?)\]$/);
	if( match ){
		return match[1];
	}
	return validation;
}

Schema.prototype.executeSimpleArrayValidation = function(validation, obj, field){
	var validationObj = this.validations[validation];
	if( typeof obj[field] === 'undefined' ){
		return;
	}
	if( obj[field].constructor === Array ){
		for( var i = 0; i < obj[field].length; i++){
			if( !validationObj.test( obj[field][i] ) ){
				this.throwInvalidError( validationObj, obj, field );
			}
		}
	}
	else{
		throw Error('Attribute ['+field+'] is not an array');
	}
}

Schema.prototype.executeSchemaValidation = function(schema, obj, field){
	try{
		schema.check(obj[field]);
	}
	catch(err){
		throw Error( 'Error validating field [' + field + ']: ' + err.message)
	}	
}

function ArrayOfSchema(schema){
	this.schema = schema;	
}
util.inherits(ArrayOfSchema, Schema);

ArrayOfSchema.prototype.check = function(value){	
	if( typeof value != 'undefined' ){
		if( value.constructor === Array ){
			for( var i = 0; i < value.length; i++){				
				this.schema.check( value[i] );
			}
		}
		else{
			throw Error('value is not an array');
		}
	}
		
}

exports.Schema = function(options){
	return new Schema(options);
}

exports.arrayOf = function( schema ){
	return new ArrayOfSchema(schema);
}