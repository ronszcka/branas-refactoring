import Segment from "./Segment";

export default interface FareCalculatorStrategy {

    next?: FareCalculatorStrategy;

    calculate(segment: Segment): number;

}