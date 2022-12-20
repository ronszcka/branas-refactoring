import Ride from "../../src/4/Ride";

import NormalFareCalculatorStrategy from "../../src/4/NormalFareCalculatorStrategy";
import OvernightFareCalculatorStrategy from "../../src/4/OvernightFareCalculatorStrategy";
import SundayFareCalculatorStrategy from "../../src/4/SundayFareCalculatorStrategy";
import OvernightSundayFareCalculatorStrategy from "../../src/4/OvernightSundayFareCalculatorStrategy";
import SpecialDayFareCalculatorStrategy from "../../src/4/SpecialDayFareCalculatorStrategy";

let ride: Ride;

beforeEach(() => {

    const normalFareCalculatorStrategy = new NormalFareCalculatorStrategy();
    const overnightFareCalculatorStrategy = new OvernightFareCalculatorStrategy(normalFareCalculatorStrategy);
    const sundayFareCalculatorStrategy = new SundayFareCalculatorStrategy(overnightFareCalculatorStrategy);
    const overnightSundayFareCalculatorStrategy = new OvernightSundayFareCalculatorStrategy(sundayFareCalculatorStrategy); //
    const specialDayFareCalculatorStrategy = new SpecialDayFareCalculatorStrategy(overnightSundayFareCalculatorStrategy);

    ride = new Ride(specialDayFareCalculatorStrategy);

});

test("Deve calcular uma corrida no primeiro dia do mês", function () {

    ride.addSegment(10, new Date("2021-03-01T10:00:00"));

    expect(ride.calculateFare()).toBe(15);

});

test("Deve calcular uma corrida diúrna em dias normais", function () {

    ride.addSegment(10, new Date("2021-03-02T10:00:00"));

    expect(ride.calculateFare()).toBe(21);

});

test("Deve calcular uma corrida noturna", function () {

    ride.addSegment(10, new Date("2021-03-02T23:00:00"));

    expect(ride.calculateFare()).toBe(39);
    
});

test("Deve calcular uma corrida diúrna no domingo", function () {

    ride.addSegment(10, new Date("2021-03-07T10:00:00"));

    expect(ride.calculateFare()).toBe(29);
    
});

test("Deve calcular uma corrida noturna no domingo", function () {

    ride.addSegment(10, new Date("2021-03-07T23:00:00"));

    expect(ride.calculateFare()).toBe(50);

});

test("Não deve calcular uma corrida com disância inferior a zero", function () {

    expect(
        () => {

            ride.addSegment(-10, new Date("2021-03-01T10:00:00"));

            ride.calculateFare();

        }
    ).toThrow(new Error("Invalid distance"));

});

test("Não deve calcular uma corrida com data inválida", function () {
    
    expect(
        () => {

            ride.addSegment(10, new Date("abcdef"));

            ride.calculateFare();

        }
    ).toThrow(new Error("Invalid date"));

});

test("Deve calcular uma corrida com valor mínimo", function () {

    ride.addSegment(3, new Date("2021-03-01T10:00:00"));

    expect(ride.calculateFare()).toBe(10);
    
});