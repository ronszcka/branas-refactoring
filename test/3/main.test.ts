import Ride from "../../src/3/Ride";

test("Deve calcular uma corrida no primeiro dia do mês", function () {

    const ride = new Ride();
    
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));

    expect(ride.calculateFare()).toBe(15);

});

test("Deve calcular uma corrida diúrna em dias normais", function () {

    const ride = new Ride();
    
    ride.addSegment(10, new Date("2021-03-02T10:00:00"));

    expect(ride.calculateFare()).toBe(21);

});

test("Deve calcular uma corrida noturna", function () {

    const ride = new Ride();
    
    ride.addSegment(10, new Date("2021-03-02T23:00:00"));

    expect(ride.calculateFare()).toBe(39);
    
});

test("Deve calcular uma corrida diúrna no domingo", function () {

    const ride = new Ride();
    
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));

    expect(ride.calculateFare()).toBe(29);
    
});

test("Deve calcular uma corrida noturna no domingo", function () {

    const ride = new Ride();
    
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));

    expect(ride.calculateFare()).toBe(50);

});

test("Não deve calcular uma corrida com disância inferior a zero", function () {

    expect(
        () => {

            const ride = new Ride();

            ride.addSegment(-10, new Date("2021-03-01T10:00:00"));

            ride.calculateFare();

        }
    ).toThrow(new Error("Invalid distance"));

});

test("Não deve calcular uma corrida com data inválida", function () {
    
    expect(
        () => {

            const ride = new Ride();

            ride.addSegment(10, new Date("abcdef"));

            ride.calculateFare();

        }
    ).toThrow(new Error("Invalid date"));

});

test("Deve calcular uma corrida com valor mínimo", function () {

    const ride = new Ride();
    
    ride.addSegment(3, new Date("2021-03-01T10:00:00"));

    expect(ride.calculateFare()).toBe(10);
    
});