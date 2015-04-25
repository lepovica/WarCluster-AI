module.exports = function(id, sun, homePlanet, planets){
	var user = {}
	user.prototype.id = id;
	user.prototype.sun = sun;
	user.prototype.homePlanet = homePlanet;
	user.prototype.planets = planets;
	return user;
};
