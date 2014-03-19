var util = require('util'),
    Constraint = require('./constraint');

function PrimitiveConstraint(config){
	this.config = config;

	Object.defineProperties(this, {
		name: {
			value: config.name
		},
		message:{
			value: config.message
		}
	});

	Object.freeze(this);
}
util.inherits(PrimitiveConstraint, Constraint);

PrimitiveConstraint.prototype.test = function(value, flaws){
	if( !this.config.test(value) ){
		flaws.push( this.name )
		return false;
	}
	return true;
}

module.exports = PrimitiveConstraint;