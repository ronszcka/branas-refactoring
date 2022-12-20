import FareCalculatorStrategy from "./FareCalculatorStrategy";

import Segment from "./Segment";

export default class Ride {
    
    MIN_FARE = 10;
    
    segments: Segment[];

    constructor (readonly fareCalculatorStrategy: FareCalculatorStrategy) {
        this.segments = [];
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculateFare() {

        let totalRidePrice = 0;
	
        for (const segment of this.segments) {

            totalRidePrice += this.fareCalculatorStrategy.calculate(segment);
            
        }

        return (totalRidePrice < this.MIN_FARE) ? this.MIN_FARE : totalRidePrice;
        
    }

}