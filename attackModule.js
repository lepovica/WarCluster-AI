module.exports= function() {
  this.attackModule = new FuzzyModule();
  var distanceFLV = this.attackModule.createFLV("distance")
  var close_to_target = distanceFLV.addLeftShoulderSet("close", 0, 900, 2000);
  var average_to_target = distanceFLV.addTriangleSet("average", 900, 2000, 4000);
  var far_to_target = distanceFLV.addRightShoulderSet("far", 2000, 4000, 400000);

  var sizeFLV = this.attackModule.createFLV("size");
  var small_target = sizeFLV.addLeftShoulderSet("small", 1, 3, 5);
  var medium_target = sizeFLV.addTriangleSet("medium",3 ,5, 6);
  var big_target = sizeFLV.addRightShoulderSet("big", 5, 7, 10);

  var desirabilityFLV = this.attackModule.createFLV("desirability");
  var undesirable = desirabilityFLV.addLeftShoulderSet("undesirable", 0, 30, 50);
  var desirable = desirabilityFLV.addTriangleSet("desirable", 30, 50 ,70);
  var very_desirable = desirabilityFLV.addRightShoulderSet("very_desirable", 50, 70, 100);


  var declareRules = function(desirable, undesirable, very_desirable, close_to_target, average_to_target, far_to_target, small_target, medium_target, big_target) {
    self.attackModule.addRule(FzAND(close_to_target, small_target), desirable);
    self.attackModule.addRule(FzAND(close_to_target, medium_target), desirable);
    self.attackModule.addRule(FzAnd(close_to_target, big_target), very_desirable);

    self.attackModule.addRule(FzAND(average_to_target, small_target), undesirable);
    self.attackModule.addRule(FzAND(average_to_target, medium_target), desirable);
    self.attackModule.addRule(FzAnd(average_to_target, big_target), very_desirable);

    self.attackModule.addRule(FzAND(far_to_target, small_target), undesirable);
    self.attackModule.addRule(FzAND(far_to_target, medium_target), undesirable);
    self.attackModule.addRule(FzAnd(far_to_target, big_target), desirable);
  }
}

module.exports.prototype.getCrispValue = function() {
  this.attackModule.fuzzify(/*value*/)
}