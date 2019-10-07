const ValidationError = require('../validationError');

class Schema {

  check(value) {
    return true;
  }
  
  getName() {
    throw Error('No name defined');
  }
  
  sendError(flaws, field) {
    throw new ValidationError(flaws, field);
  }
}

module.exports = Schema;
