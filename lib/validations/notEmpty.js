const {testIfDefined} = require('./util');

exports.name = 'notEmpty';

exports.test = function(value){
	return testIfDefined(value, function(){
		return value.length > 0;
	})
};

exports.message = 'attribute %attr% is empty';