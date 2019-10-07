const Constraint = require('./constraint');

class PrimitiveConstraint extends Constraint {
	constructor(config) {
		super();
		this.config = config;
		
		Object.defineProperties(this, {
			name: {
				value: config.name
			},
			message:{
				value: config.message
			}
		});	
	}

	test(value, flaws) {
		if( !this.config.test(value) ){
			flaws.push( this.name )
			return false;
		}
		return true;
	}
}


module.exports = PrimitiveConstraint;