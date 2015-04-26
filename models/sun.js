module.exports = function (id, planets) {
	var sun = {};
	sun.prototype.id = id;
	sun.prototype.planets = planets;
	return sun;
};