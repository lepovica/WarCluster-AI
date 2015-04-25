function TriangleFuzzySet(leftPoint, peakPoint, rightPoint) {
	return {
		_peakPoint : peakPoint,
		_leftPoint : leftPoint,
		_rightPoint : rightPoint,
		calculateDOM : function(value) {
					if( ((rightPoint === 0.0) && (peakPoint === value)) || ((leftPoint === 0.0) && (peakPoint === value)) ) {
						return 1.0;
					}
					if( (value <= peakPoint) && (value >= (peakPoint - leftPoint)) ){
						var grad = 1.0 / leftPoint;
						return grad * (value - (peakPoint - leftPoint));
							
					}else {
						if( (value > peakPoint) && (value < (peakPoint + rightPoint))) {
							var grad = 1.0 / -rightPoint;
							return grad * (value - peakPoint) + 1.0;
						}else {
							return 0.0;
						}
					}
				}
		}
}
