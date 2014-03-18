module.exports = {
	testIfDefined: function(value, test){
		if( typeof value != 'undefined' ){
			return test(value);
		}
		return true;	
	}
}