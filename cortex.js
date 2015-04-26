var attackModule = require('./attackModule');

module.exports = function(wai){
  var self = this;
  this.wai = wai;
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
    if (currentPlanet.Owner === "warclusterai") {
      this.waiPlanets.push(data.Planets[planet]);
    }
    if (currentPlanet.Owner === this.emperor.Username) {
      var homePlanet = this.playerData.HomePlanet;
      var distance = Math.sqrt( Math.pow((homePlanet.Position.X - currentPlanet.Position.X), 2) + Math.pow((homePlanet.Position.Y - currentPlanet.Position.Y), 2));
      var desirability = this.attackModule.getCrispValue(parseInt(distance), data.Planets[planet].Size)/*distance, size*/
      // console.log("desirability", desirability)
      this.emperorPlanets.push({
          desirability: desirability,
          PlanetData: data.Planets[planet]
        });

    }
  }

	this.emperorPlanets.sort(function (a, b) {
  	if (!a.desirability) {
  		return -1;
  	}
  	else if(!b.desirability) {
  		return 1;
  	}
  	else {
  		return b.desirability - a.desirability;	
  	}
  });

  var attackPlanets = this.waiPlanets.map(function(elem) {
    return "planet." + elem.Name;
  });

  console.log(this.emperorPlanets);

  this.wai.sendMission("Attack", attackPlanets, "planet." + this.emperorPlanets[0].PlanetData.Name, 10);

}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}

module.exports.prototype.setPlayerData = function(playerData) {
  this.playerData = playerData;
}




