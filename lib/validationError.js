class ValidationError extends Error {
	constructor(flaws, field) {
		super();
		this.stack = '';
		this.flaws = flaws;
		this.field = field;
		
		this.message = 'Validation error: Fault(s) [' + this.flaws.join(', ') + '] on field [' + this.field + ']';
	}

	toString() {
		return 'Validation Fault: [' + this.flaws.join(', ') + '] on field [' + this.field + ']';
	}
}

module.exports = ValidationError;
