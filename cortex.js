
module.exports = function(){
  this.users = {};
  this.suns = {};
  this.planets = {}
  this.emperorPlanets = [];
  this.emperor;
}


module.exports.prototype.parseView = function(data) {
  Object.keys(data.Planets).forEach(function (planet) {
    if (planet.Owner == this.emperor) {
      this.emperorPlanets.push(planet)
    }
  })
}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}




