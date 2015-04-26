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
  var attackModule = new FuzzyModule();
  var distanceFLV = attackModule.createFLV("distance")
  var close_to_target = distanceFLV.addLeftShoulderSet("close", 0, 900, 2000);
  var average_to_target = distanceFLV.addTriangleSet("average", 900, 2000, 4000);
  var far_to_target = distanceFLV.addRightShoulderSet("far", 2000, 4000, 400000);

  var sizeFLV = attackModule.createFLV("size");
  var small_target = sizeFLV.addLeftShoulderSet("small", 1, 3, 5);
  var medium_target = sizeFLV.addTriangleSet("medium",3 ,5, 6);
  var big_target = sizeFLV.addRightShoulderSet("big", 5, 7, 10);

  var desirabilityFLV = attackModule.createFLV("desirability");
  var undesirable = desirabilityFLV.addLeftShoulderSet("undesirable", 0, 30, 50);
  var desirable = desirabilityFLV.addTriangleSet("desirable", 30, 50 ,70);
  var very_desirable = desirabilityFLV.addRightShoulderSet("very_desirable", 50, 70, 100);


  var declareRules = function(attackModule, desirable, undesirable, very_desirable, close_to_target, average_to_target, far_to_target, small_target, medium_target, big_target) {
    attackModule.addRule(FzAND(close_to_target, small_target), desirable);
    attackModule.addRule(FzAND(close_to_target, medium_target), desirable);
    attackModule.addRule(FzAnd(close_to_target, big_target), very_desirable);

    attackModule.addRule(FzAND(average_to_target, small_target), undesirable);
    attackModule.addRule(FzAND(average_to_target, medium_target), desirable);
    attackModule.addRule(FzAnd(average_to_target, big_target), very_desirable);

    attackModule.addRule(FzAND(far_to_target, small_target), undesirable);
    attackModule.addRule(FzAND(far_to_target, medium_target), undesirable);
    attackModule.addRule(FzAnd(far_to_target, big_target), desirable);
  }



}




