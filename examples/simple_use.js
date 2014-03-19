var validator = require('../').create();

var custom = validator.Schema({
	bar: 'required string notEmpty'
});
var schema = validator.Schema({
	foo: ['required', validator.arrayOf(custom), 'notEmpty']
});

var valid = {
	foo: [
		{ bar: 'not empty string'},
		{ bar: 'another string'}
	]
}

try{
	schema.check(valid);
}
catch(err){
	console.log(err);
	throw err;
}