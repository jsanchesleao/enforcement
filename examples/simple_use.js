var validator = require('../').create();

var schema = validator.Schema({
	foo: '[string notEmpty]'
})

try{
	schema.check({
		foo: ['']
	});
}
catch(err){
	console.log(err);
	throw err;
}