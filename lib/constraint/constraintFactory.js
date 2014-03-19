var FORMAT_REGEX = /^((\w+)|(\[[\w\s]+\])|\s)+$/;
var PART_REGEX = /^(\w+)|(\[[\w\s]+\])/;
var ARRAY_REGEX = /^\[([\w\s]+)\]$/;

var ArrayConstraint     = require('./arrayConstraint'),
    CompositeConstraint = require('./compositeConstraint'),
    SchemaConstraint    = require('./schemaConstraint'),
    Schema              = require('../schema/schema');

function create(validator, config){
	var constraints = {};
	for(var i in config){
		var constraint = findConstraint( validator, config[i], i );
		constraints[i] = constraint;
	}
	return constraints;
}

function findConstraint(validator, definition, name){
	if( definition.constructor === Array ){
		return findComposite( validator, definition );
	}
	else if( definition.constructor === String ){
		var parsed = parse(definition);
		if( parsed.length === 0 ){
			throw Error('Bad constraint definition: [' + definition + ']');
		}
		else if( parsed.length === 1 ){
			return findSimple(validator, parsed[0]);
		}
		else{
			return findComposite( validator, parsed );
		}
	}
	else if( definition instanceof Schema ){
		return new SchemaConstraint( definition, name );
	}
}

function parse(definition){
	var parts = [];
	if( !definition.match(FORMAT_REGEX) ){
		return parts;
	}

	var text = definition;
	while( text.length > 0 ){
		text = text.trimLeft();
		var next = text.match(PART_REGEX);
		if( next[1] ) parts.push(next[1]);
		if( next[2] ) parts.push(next[2]);
		text = text.replace(PART_REGEX, '');
		text = text.trimLeft();
	}
	return parts;
}

function findSimple(validator, name){
	if(name.match(ARRAY_REGEX)){
		return findArray( validator, name );
	}
	else{
		if( !validator.constraints[name] ){
			throw Error('Constraint named ['+name+'] is not registered');
		}
		return validator.constraints[name];
	}	
}

function findArray(validator, name){
	var text = name.match(ARRAY_REGEX)[1];
	var constraint = findConstraint(validator, text);
	return new ArrayConstraint(constraint);
}

function findComposite(validator, definitions){
	var constraint = new CompositeConstraint();
	for( var i = 0; i < definitions.length; i++ ){
		if( definitions[i] instanceof Schema ){
			constraint.add( new SchemaConstraint(definitions[i]) );
		}
		else if (definitions[i].constructor === String){
			constraint.add( findConstraint(validator, definitions[i]) );
		}
		else{
			throw Error("Illegal object to create constraint: [" + definitions[i] + "]");
		}
	}
	return constraint;
}

exports.create = create;