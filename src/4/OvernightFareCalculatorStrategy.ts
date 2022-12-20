import FareCalculatorStrategy from "./FareCalculatorStrategy";

import Segment from "./Segment";

export default class OvernightFareCalculatorStrategy implements FareCalculatorStrategy {

    FARE = 3.9;

    next?: FareCalculatorStrategy;

    constructor(next?: FareCalculatorStrategy) {
        this.next = next;
    }

    calculate(segment: Segment): number {

        if (segment.isOvernight() && !segment.isSunday()) {
            return segment.distance * this.FARE;
        }

        if (!this.next) {
            throw new Error();
        }

        return this.next.calculate(segment);
        
    }

}