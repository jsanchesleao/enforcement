const Schema = require('./schema');
const constraintFactory = require('../constraint/constraintFactory');

class ObjectSchema extends Schema {
	constructor(validator, config) {
		super();
		this.validator = validator;
		this.constraints = constraintFactory.create(validator, config);
	}
	
	check(obj) {
		for(let i in this.constraints){
			const flaws = [];
			if( !this.constraints[i].test( obj[i], flaws ) ){
				this.sendError( flaws, i );
			}
		}
	}
	
}
module.exports = ObjectSchema;