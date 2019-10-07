const Constraint = require('./constraint');

class ArrayConstraint extends Constraint {
	constructor(baseConstraint) {
		super();
		this.baseConstraint = baseConstraint;
		Object.defineProperties(this, {
			name: {
				value: '[' + baseConstraint.name + ']',
				writable: false
			}
		});
	}

	test(value, flaws) {
		if( typeof value != 'undefined' && value != null ){
			if( value.constructor !== Array ){
				flaws.push('Array');
				return false;
			}
			for( let i = 0; i < value.length; i++ ){
				if(!this.baseConstraint.test( value[i], flaws )){
					return false;
				}
			}
		}
		return true;
	}
}


module.exports = ArrayConstraint;