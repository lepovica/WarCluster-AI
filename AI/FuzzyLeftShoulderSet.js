function FuzzyLeftShoulderSet(leftOffset, peakPoint, rightOffset) {
	return {
		_peakPoint : peakPoint,
		_leftOffset : leftOffset,
		_rightOffset : rightOffset,
		calculateDOM : function(value) {
			if ( (rightOffset === 0.0) && (value === peakPoint) ) {
				return 1.0;
			}
			if ( (value >= peakPoint) && (value < (peakPoint - rightOffset))) {
				var grad = 1.0 / rightOffset;
				return grad * (value - (peakPoint - rightOffset));
			} else {
				if (value < peakPoint) {
					return 1.0;
				} else {
					return 0.0;
				}
			}
		}
	}
}