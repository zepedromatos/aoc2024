import { input } from "./input";
import { calculateDistance, getLines } from "../utils";

// PT1

const isStrictlyAscendingOrDescending = (
	arr: number[],
	isIncreasing: boolean
): boolean => {
	for (let i = 0; i < arr.length - 1; i++) {
		const currentValue = arr[i];
		const nextValue = arr[i + 1];

		const isCorrectOrder = isIncreasing
			? currentValue < nextValue
			: currentValue > nextValue;

		const isValidDistance =
			calculateDistance(currentValue, nextValue) >= 1 &&
			calculateDistance(currentValue, nextValue) <= 3;

		if (!isCorrectOrder || !isValidDistance) {
			return false;
		}
	}

	return true;
};

const findValidArrangements = (lines: number[][]): number[][] =>
	lines.filter(
		(line) =>
			isStrictlyAscendingOrDescending(line, true) ||
			isStrictlyAscendingOrDescending(line, false)
	);

const lines = getLines(input);
const validArrangements = findValidArrangements(lines);
console.log(validArrangements.length);

// PT2
