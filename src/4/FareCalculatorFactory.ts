import Segment from "./Segment";

import NormalFareCalculatorStrategy from "./NormalFareCalculatorStrategy";
import OvernightFareCalculatorStrategy from "./OvernightFareCalculatorStrategy";
import OvernightSundayFareCalculatorStrategy from "./OvernightSundayFareCalculatorStrategy";
import SpecialDayFareCalculatorStrategy from "./SpecialDayFareCalculatorStrategy";
import SundayFareCalculatorStrategy from "./SundayFareCalculatorStrategy";

export default class FareCalculatorFactory {

    static create(segment: Segment) {

        if (segment.isSpecialDay()) {
            return new SpecialDayFareCalculatorStrategy();
        }

        if (segment.isOvernight() && !segment.isSunday()) {
            return new OvernightFareCalculatorStrategy();
        }

        if (segment.isOvernight() && segment.isSunday()) {
            return new OvernightSundayFareCalculatorStrategy();
        }
        
        if (!segment.isOvernight() && segment.isSunday()) {
            return new SundayFareCalculatorStrategy();
        }

        if (!segment.isOvernight() && !segment.isSunday()) {
            return new NormalFareCalculatorStrategy();
        }

        throw new Error();

    }

}