var ValidationError = require('../validationError');
var Either = require('data.either');

function Schema(){
}

Schema.prototype.check = function(value){
	return true;
}

Schema.prototype.validate = function(value) {
  try {
    this.check(value);
    return Either.Right(value);
  }
  catch(e) {
    return Either.Left(e);
  }
}

Schema.prototype.getName = function(){
	throw Error('No name defined');
}

Schema.prototype.sendError = function(flaws, field){
	throw new ValidationError(flaws, field);
}

module.exports = Schema;
