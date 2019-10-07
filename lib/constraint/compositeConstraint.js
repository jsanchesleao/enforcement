const Constraint = require('./constraint');

class CompositeConstraint extends Constraint{
	constructor() {
		super();
		this.constraints = [];
	}

	test(value, flaws) {
		for( let i = 0; i < this.constraints.length; i++ ){
			if(!this.constraints[i].test(value, flaws)){
				return false;
			}
		}
		return true;
	}
	
	add(constraint) {
		this.constraints.push( constraint );
	}
}


module.exports = CompositeConstraint;