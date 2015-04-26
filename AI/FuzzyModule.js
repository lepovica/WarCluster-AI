var FuzzyTriangleSet = require("./FuzzyTriangleSet");
var FuzzyLeftShoulderSet = require("./FuzzyLeftShoulderSet");
var FuzzyRightShoulderSet = require("./FuzzyRightShoulderSet");
var FuzzyVariable = require("./FuzzyVariable");
var FuzzyRule = require("./FuzzyRule");
var FuzzyTerm = require("./FuzzyTerm");
var FzAND = require("./FzAND");
var FzOR = require("./FzOR");

module.exports = function() {
	var core = {
		_varMap : {},
		_fuzzyRules : [],
		createFLV : function(variableName) {
			var newVar = FuzzyVariable(variableName);
			core._varMap[variableName] = newVar;
			return newVar;
		},
		addRule : function(antecedent, consequence) {
			var newRule = FuzzyRule(antecedent, consequence);
			core._fuzzyRules.push(newRule);
			return newRule;
		},
		fuzzify : function(nameOfFLV, crispValue) {
			var flv = core._varMap[nameOfFLV];
			flv.fuzzify(crispValue);
		},
		deFuzzify : function(nameOfFLV) {
			var confidenceMap = {};
			var flv = core._varMap[nameOfFLV];

			var rules = core._fuzzyRules;
			for(var i = 0; i < rules.length; i++) {
				rules[i]._con.calculate();
			}
			for(key in flv._memberSet) {
				for(var j = 0; j < rules.length; j++) {
					if(rules[j]._con.getName === key) {
						if ( flv._memberSet[key].getDOM() > rules[j]._con.getDOM()) {
							flv._memberSet[key].setDOM(rules[j]._con.getDOM());
						}
						confidenceMap[key] = flv._memberSet[key].getDOM()
					}
				}
			}
			return flv.deFuzzify(confidenceMap);
		}
	}
	return core;
}