var FuzzyModule = require('./AI/FuzzyModule');
var FzAND = require('./AI/FzAND');
var FzOR = require('./AI/FzOR');
var attackModule = require('./attackModule');

module.exports = function(){
  var self = this;
  this.users = {};
  this.suns = {};
  this.planets = {}
  this.emperorPlanets = [];
  this.emperor;
  this.waiPlanets = [];

  this.attackModule = new attackModule();
}


module.exports.prototype.parseView = function(data) {
  var self = this;
  for (planet in data.Planets) {
    if (planet.Owner == this.emperor) {
      console.log("planet", data.Planets[planet])
      this.emperorPlanets.push(data.Planets[planet])

      //Math.sqrt( Math.pow((this.x - otherPlanet.x), 2) + Math.pow((this.y - otherPlanet.y), 2));

    }
  }
}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}

module.exports.prototype.choseEnemy = function() {

}




