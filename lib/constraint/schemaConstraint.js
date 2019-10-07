const Constraint = require('./constraint');

class SchemaConstraint extends Constraint {
	constructor(schema, name) {
		super();
		this.schema = schema;
		
		Object.defineProperties(this, {
			name: {
				value: name
			},
			message:{
				value: 'Schema validation failed.'
			}
		});
	}
	
	test(value, flaws) {
		try{
			this.schema.check(value)
			return true;
		}
		catch(err){
			if( err.flaws ){
				for( let i = 0; i < err.flaws.length; i++){
					flaws.push( err.flaws[i]);
				}
			}
			return false;
		}
	}
} 


module.exports = SchemaConstraint;