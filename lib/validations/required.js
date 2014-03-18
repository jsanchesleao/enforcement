exports.name = 'required';

exports.test = function(value){
	return value != null && typeof value != 'undefined';
};

exports.message = 'attribute %attr% is not defined';