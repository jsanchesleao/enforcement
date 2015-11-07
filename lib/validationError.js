var util = require('util');

function ValidationError( flaws, field ){
        this.stack = ''; //ISSUE #2 https://github.com/jsanchesleao/enforcement/issues/2

	Error.call(this); //super constructor
	Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object


	this.flaws = flaws;
	this.field = field;
	this.message = 'Validation error: Fault(s) [' + this.flaws.join(', ') + '] on field [' + this.field + ']';
}

util.inherits(ValidationError, Error);


ValidationError.prototype.toString = function(){
	return 'Validation Fault: [' + this.flaws.join(', ') + '] on field [' + this.field + ']';
}


module.exports = ValidationError;
