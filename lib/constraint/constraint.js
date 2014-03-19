function Constraint(){
	
}

Constraint.prototype.test = function(){
	return true;
}

Constraint.prototype.name = '';

Constraint.prototype.message = 'validation Error'

module.exports = Constraint;