var ValidationError = require('../validationError');

function Schema(){
}

Schema.prototype.check = function(value){
	return true;
}

Schema.prototype.getName = function(){
	throw Error('No name defined');
}

Schema.prototype.sendError = function(flaws, field){
	throw new ValidationError(flaws, field);
}

module.exports = Schema;