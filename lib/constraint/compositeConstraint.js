var util = require('util'),
    Constraint = require('./constraint');

function CompositeConstraint(){
	this.constraints = [];
	Object.seal(this);
}
util.inherits(CompositeConstraint, Constraint);

CompositeConstraint.prototype.test = function(value, flaws){
	for( var i = 0; i < this.constraints.length; i++ ){
		if(!this.constraints[i].test(value, flaws)){
			return false;
		}
	}
	return true;
}

CompositeConstraint.prototype.add = function(constraint){
	this.constraints.push( constraint );
}

module.exports = CompositeConstraint;