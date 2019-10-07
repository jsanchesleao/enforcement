const Schema = require('./schema');

class ArraySchema extends Schema {
	constructor (schema){
		super();
		this.baseSchema = schema;
	}
	
	check(value) {	
		for( let i = 0; i < value.length; i++){
			const element = value[i];
			this.baseSchema.check( element );
		}
	}
}


module.exports = ArraySchema;
