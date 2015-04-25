function FuzzyRightShoulderSet(leftOffset, peakPoint, rightOffset) {
	return {
		_peakPoint : peakPoint,
		_leftOffset : leftOffset,
		_rightOffset : rightOffset,
		calculateDOM : function(value) {
			if ( (leftOffset === 0.0) && (value === peakPoint) ) {
				return 1.0;
			}
			if ( (value <= peakPoint) && (value > (peakPoint - leftOffset))) {
				var grad = 1.0 / leftOffset;
				return grad * (value - (peakPoint - leftOffset));
			} else {
				if (value > peakPoint) {
					return 1.0;
				} else {
					return 0.0;
				}
			}
		}
	}
}