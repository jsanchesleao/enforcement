class Constraint {
	
  constructor() {
		this.name = '';
		this.message = 'validation Error'
	}

	test() {
		return true;
	}
	
}

module.exports = Constraint;