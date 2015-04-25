module.exports = function(fuzzyTermn1, fuzzyTerm2) {
	if (fuzzyTermn1.getDOM() < fuzzyTerm2.getDOM()) {
		return fuzzyTerm1;
	} else {
		return fuzzyTerm2;
	}
}