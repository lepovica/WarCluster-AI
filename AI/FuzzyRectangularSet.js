module.exports = function(name, leftOffset, peakPoint, rightOffset) {
	var core = {
		_name : name,
		_DOM : 0.0,	
		_peakPoint : peakPoint,
		_leftOffset : leftOffset,
		_rightOffset : rightOffset,
		calculateDOM : function(value) {
			if ( (core._leftOffset >= value) && (core._rightOffset <=  value) ) {
				return 1.0;
			} else {
				return 0.0;
			}
		},
		clearDOM : function() {
			core._DOM = 0.0;
		},
		setDOM : function(value) {
			core._DOM = value;
		},
		getDOM : function(value) {
			return core._DOM;
		},
		getName : function() {
			return core._name;
		}
	}
	return core;
}