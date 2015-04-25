function Planet(id, ships, capacity, x, y, size) {
	this.id = id;
	this.ships = ships;
	this.capacity = capacity;
	this.x = x;
	this.y = y;
	this.size = size; 
};

Planet.prototype.distance = function (otherPlanet) {
	return Math.sqrt( Math.pow((this.x - otherPlanet.x), 2) + Math.pow((this.y - otherPlanet.y), 2));
}

module.exports = Planet;