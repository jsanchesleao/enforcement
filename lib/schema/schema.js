var ValidationError = require('../validationError');
var either = require('either-fantasy');

function Schema(){
}

Schema.prototype.check = function(value){
	return true;
}

Schema.prototype.validate = function(value) {
  try {
    this.check(value);
    return either.of(value);
  }
  catch(e) {
    return either.left(e);
  }
}

Schema.prototype.getName = function(){
	throw Error('No name defined');
}

Schema.prototype.sendError = function(flaws, field){
	throw new ValidationError(flaws, field);
}

module.exports = Schema;
