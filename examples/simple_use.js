var validator = require('../').create();

var schema = validator.Schema({
	foo: '[required string]'
})

try{
	schema.check({
		foo: ['123']
	});
}
catch(err){
	console.log(err);
	throw err;
}