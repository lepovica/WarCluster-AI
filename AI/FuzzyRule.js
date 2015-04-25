var FuzzyTriangleSet = require("./FuzzyTriangleSet");
var FuzzyLeftShoulderSet = require("./FuzzyLeftShoulderSet");
var FuzzyRightShoulderSet = require("./FuzzyRightShoulderSet");


module.exports = function(antecedent, consequent) {
	var core = {
		_ant : antencedent,
		_con : consequent,
		setConfidenceOfConsequentToZero : function() {
			core._con.clearDOM();
		},
		calculate() {
			core._con.ORwithDOM(core._ant.getDOM());
		}
	}
	return core;
}