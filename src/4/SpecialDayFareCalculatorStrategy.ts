import FareCalculatorStrategy from "./FareCalculatorStrategy";
import Segment from "./Segment";

export default class SpecialDaySundayFareCalculator implements FareCalculatorStrategy {

    FARE = 1.5;

    next?: FareCalculatorStrategy;

    constructor(next?: FareCalculatorStrategy) {
        this.next = next;
    }

    calculate(segment: Segment): number {

        if (segment.isSpecialDay()) {
            return segment.distance * this.FARE;
        }

        if (!this.next) {
            throw new Error();
        }

        return this.next.calculate(segment);
        
    }

}