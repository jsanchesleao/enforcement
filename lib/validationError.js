var util = require('util');

function ValidationError( flaws, field ){
	Error.call(this); //super constructor
	Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object


	this.flaws = flaws;
	this.field = field;
	this.message = 'Validation error: Fault(s) [' + this.flaws.join(', ') + '] on field [' + this.field + ']';
	Object.freeze(this);
}

util.inherits(ValidationError, Error);


ValidationError.prototype.toString = function(){
	return 'Validation Fault: [' + this.flaws.join(', ') + '] on field [' + this.field + ']';
}


module.exports = ValidationError;