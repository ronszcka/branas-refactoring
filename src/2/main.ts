// @ts-nocheck

const NORMAL_FARE = 2.1;
const OVERNIGHT_FARE = 3.9;
const SUNDAY_FARE = 2.9;
const OVERNIGHT_SUNDAY_FARE = 5;
const FIRST_DAY_FARE = 1.5;
const MIN_FARE = 10;
const SPECIAL_DAY = 1;
const OVERNIGHT_START = 22;
const OVERNIGHT_END = 6;

export function calculateRide(segments: any) {
	
	let totalRidePrice = 0;
	
	for (const segment of segments) {

		if (!isValidDistance(segment.distance)) {
			throw new Error("Invalid distance");
		}

		if (!isValidDate(segment.date)) {
			throw new Error("Invalid date");
		}

		if (isSpecialDay(segment.date)) {
			totalRidePrice += segment.distance * FIRST_DAY_FARE;
			continue;
		}

		if (isOvernight(segment.date) && isSunday(segment.date)) {
			totalRidePrice += segment.distance * OVERNIGHT_SUNDAY_FARE;
			continue;
		}

		if (isOvernight(segment.date) && !isSunday(segment.date)) {
			totalRidePrice += segment.distance * OVERNIGHT_FARE;
			continue;
		}
		
		if (!isOvernight(segment.date) && isSunday(segment.date)) {
			totalRidePrice += segment.distance * SUNDAY_FARE;
			continue;
		}

		if (!isOvernight(segment.date) && !isSunday(segment.date)) {
			totalRidePrice += segment.distance * NORMAL_FARE;
			continue;
		}
		
	}

	return (totalRidePrice < MIN_FARE) ? MIN_FARE : totalRidePrice;

}

function isOvernight(date: Date) {
	return date.getHours() >= OVERNIGHT_START || date.getHours() <= OVERNIGHT_END;
}

function isSunday(date: Date) {
	return date.getDay() === 0;
}

function isSpecialDay(date: Date) {
	return date.getDate() === SPECIAL_DAY;
}

function isValidDistance(distance: number) {
	return distance != null && distance != undefined && typeof distance === "number" && distance > 0;
}

function isValidDate(date: Date) {
	return date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date";
}

