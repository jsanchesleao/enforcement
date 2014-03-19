var util = require('util'),
    Constraint = require('./constraint');

function SchemaConstraint(schema, name){
	this.schema = schema;

	Object.defineProperties(this, {
		name: {
			value: name
		},
		message:{
			value: 'Schema validation failed.'
		}
	});

	Object.freeze(this);
}

util.inherits(SchemaConstraint, Constraint);

SchemaConstraint.prototype.test = function(value, flaws){
	try{
		this.schema.check(value)
		return true;
	}
	catch(err){
		if( err.flaws ){
			for( var i = 0; i < err.flaws.length; i++){
				flaws.push( err.flaws[i]);
			}
		}
		return false;
	}
}

module.exports = SchemaConstraint;