var util = require('util'),
    Constraint = require('./constraint');

function ArrayConstraint(baseConstraint){
	this.baseConstraint = baseConstraint;
	Object.defineProperties(this, {
		name: {
			value: '[' + baseConstraint.name + ']',
			writable: false
		}
	})
	Object.freeze(this);
}

ArrayConstraint.prototype.test = function(value, flaws){
	if( typeof value != 'undefined' && value != null ){
		for( var i = 0; i < value.length; i++ ){
			if(!this.baseConstraint.test( value[i], flaws )){
				return false;
			}
		}
	}
	return true;
}

util.inherits(ArrayConstraint, Constraint);

module.exports = ArrayConstraint;