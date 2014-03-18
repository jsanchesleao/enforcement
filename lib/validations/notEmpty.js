var util = require('./util');

exports.name = 'notEmpty';

exports.test = function(value){
	return util.testIfDefined(value, function(){
		return value.length > 0;
	})
};

exports.message = 'attribute %attr% is empty';