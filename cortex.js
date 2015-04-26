
module.exports = function(){
  this.users = {};
  this.suns = {};
  this.planets = {}
  this.emperorPlanets = [];
  this.emperor;
}


module.exports.prototype.parseView = function(data) {
  var self = this;
  Object.keys(data.Planets).forEach(function (planet) {
    if (planet.Owner == self.emperor) {
      self.emperorPlanets.push(planet)
    }
  })
  console.log(this.emperorPlanets)
}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}




