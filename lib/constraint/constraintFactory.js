const FORMAT_REGEX = /^((\w+)|(\[[\w\s]+\])|\s)+$/;
const PART_REGEX = /^(\w+)|(\[[\w\s]+\])/;
const ARRAY_REGEX = /^\[([\w\s]+)\]$/;

const ArrayConstraint     = require('./arrayConstraint');
const CompositeConstraint = require('./compositeConstraint');
const SchemaConstraint    = require('./schemaConstraint');
const Schema              = require('../schema/schema');

function create(validator, config){
	const constraints = {};
	for(let i in config){
		const constraint = findConstraint( validator, config[i], i );
		constraints[i] = constraint;
	}
	return constraints;
}

function findConstraint(validator, definition, name){
	if( definition.constructor === Array ){
		return findComposite( validator, definition );
	}
	else if( definition.constructor === String ){
		const parsed = parse(definition);
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
	const parts = [];
	if( !definition.match(FORMAT_REGEX) ){
		return parts;
	}

	let text = definition;
	while( text.length > 0 ){
		text = text.trimLeft();
		let next = text.match(PART_REGEX);
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
	const text = name.match(ARRAY_REGEX)[1];
	const constraint = findConstraint(validator, text);
	const arrayConstraint = new ArrayConstraint(constraint)

	return arrayConstraint;
}

function findComposite(validator, definitions){
	const constraint = new CompositeConstraint();
	for( let i = 0; i < definitions.length; i++ ){
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