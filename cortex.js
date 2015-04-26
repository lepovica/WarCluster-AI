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
    var currentPlanet = data.Planets[planet];
    if (currentPlanet.Owner === this.emperor.Username) {
      var homePlanet = this.playerData.HomePlanet;
      var distance = Math.sqrt( Math.pow((homePlanet.Position.X - currentPlanet.Position.X), 2) + Math.pow((homePlanet.Position.Y - currentPlanet.Position.Y), 2));
      var desirability = this.attackModule.getCrispValue(parseInt(distance), data.Planets[planet].Size)/*distance, size*/
      // console.log("desirability", desirability)
      this.emperorPlanets.push({
          desirability: desirability,
          planet_data: data.Planets[planet]
        });

    }
  }
  this.emperorPlanets.sort(function (a, b) {
    return a.desirability - b.desirability
  })
  console.log("this.emperorPlanets", this.emperorPlanets)
}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}

module.exports.prototype.setPlayerData = function(playerData) {
  this.playerData = playerData;
}




