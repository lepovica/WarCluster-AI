var attackModule = require('./attackModule');

module.exports = function(wai){
  var self = this;
  this.wai = wai;
  this.users = {};
  this.suns = {};
  this.planets = {}
  this.targetPlanet = undefined;
  this.emperor;
  this.waiPlanets = [];

  this.attackModule = new attackModule();
}


module.exports.prototype.parseView = function(data) {
  var self = this;
  var maxDesirability = 0.0;
  var targetPlanet;

  var homePlanet = this.playerData.HomePlanet;
  for (planet in data.Planets) {
    var currentPlanet = data.Planets[planet];
    if (currentPlanet.Owner === "warclusterai") {
      this.waiPlanets.push(data.Planets[planet]);
    } else {
      var distance = Math.sqrt( Math.pow((homePlanet.Position.X - currentPlanet.Position.X), 2) + Math.pow((homePlanet.Position.Y - currentPlanet.Position.Y), 2));
      var desirability = this.attackModule.getCrispValue(parseInt(distance), data.Planets[planet].Size)/*distance, size*/
      if(currentPlanet.Owner === "") {
        desirability *= 2.5
      } else if (currentPlanet.Owner === this.emperor.Username) {
        desirability *= 1.2
      }

      if (maxDesirability < desirability) {
        targetPlanet = currentPlanet;
        maxDesirability = desirability;
      }
    }
  }



  var attackPlanets = this.waiPlanets.map(function(elem) {
    return "planet." + elem.Name;
  });

  console.log(targetPlanet.Name + "  :  " + targetPlanet.Owner + "  :  " + maxDesirability);

  this.wai.sendMission("Attack", attackPlanets, "planet." + targetPlanet.Name, 10);

}

module.exports.prototype.rememberEmperor = function(emperor) {
  this.emperor = emperor;
}

module.exports.prototype.setPlayerData = function(playerData) {
  this.playerData = playerData;
}




