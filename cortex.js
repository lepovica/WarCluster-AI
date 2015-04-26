var attackModule = require('./attackModule');

module.exports = function(){
  var self = this;
  this.users = {};
  this.suns = {};
  this.planets = {}
  this.emperorPlanets = {};
  this.emperor;
  this.waiPlanets = [];

  this.attackModule = new attackModule();
}


module.exports.prototype.parseView = function(data) {
  var self = this;
  for (planet in data.Planets) {
    if (planet.Owner == this.emperor) {
      // console.log("planet", data.Planets[planet])
      var coord = "planet.80_200".split(".")[1].split("_");
      var homePlanet = this.playerData.HomePlanet;
      var distance = Math.sqrt( Math.pow((homePlanet.x - parseInt(coord[0])), 2) + Math.pow((homePlanet.y - parseInt(coord[1])), 2));
      var desirability = this.attackModule.getCrispValue(data.Planets[planet].Size/*distance, size*/)
      this.emperorPlanets[planet] = {
        desirability: desirability,
        planet_data: data.Planets[planet]
      }

    }
    // console.log(this.emperorPlanets)
  }
}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}

module.exports.prototype.setPlayerData = function(playerData) {
  this.playerData = playerData;
}




