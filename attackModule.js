var FuzzyModule = require('./AI/FuzzyModule');
var FzAND = require('./AI/FzAND');
var FzOR = require('./AI/FzOR');


module.exports = function() {
  var self = this;
  this.attackModule = new FuzzyModule();
  this.distanceFLV = this.attackModule.createFLV("distance")
  this.close_to_target = this.distanceFLV.addLeftShoulderSet("close", 0, 20000, 40000);
  this.average_to_target = this.distanceFLV.addTriangleSet("average", 20000, 40000, 60000);
  this.far_to_target = this.distanceFLV.addRightShoulderSet("far", 40000, 60000, 400000);

  this.sizeFLV = this.attackModule.createFLV("size");
  this.small_target = this.sizeFLV.addLeftShoulderSet("small", 1, 3, 5);
  this.medium_target = this.sizeFLV.addTriangleSet("medium",3 ,5, 6);
  this.big_target = this.sizeFLV.addRightShoulderSet("big", 5, 7, 10);

  this.desirabilityFLV = this.attackModule.createFLV("desirability");
  this.undesirable = this.desirabilityFLV.addLeftShoulderSet("undesirable", 0, 30, 50);
  this.desirable = this.desirabilityFLV.addTriangleSet("desirable", 30, 50 ,70);
  this.very_desirable = this.desirabilityFLV.addRightShoulderSet("very_desirable", 50, 70, 100);


  this.declareRules = function() {
    self.attackModule.addRule(FzAND(self.close_to_target, self.small_target), self.desirable);
    self.attackModule.addRule(FzAND(self.close_to_target, self.medium_target), self.desirable);
    self.attackModule.addRule(FzAND(self.close_to_target, self.big_target), self.very_desirable);

    self.attackModule.addRule(FzAND(self.average_to_target, self.small_target), self.undesirable);
    self.attackModule.addRule(FzAND(self.average_to_target, self.medium_target), self.desirable);
    self.attackModule.addRule(FzAND(self.average_to_target, self.big_target), self.very_desirable);

    self.attackModule.addRule(FzAND(self.far_to_target, self.small_target), self.undesirable);
    self.attackModule.addRule(FzAND(self.far_to_target, self.medium_target), self.undesirable);
    self.attackModule.addRule(FzAND(self.far_to_target, self.big_target), self.desirable);
  }
}

module.exports.prototype.getCrispValue = function(distance, size) {
  this.attackModule.fuzzify("distance", distance);
  this.attackModule.fuzzify("size", size);
  this.declareRules();
  return this.attackModule.deFuzzify("desirability");
}