import { readTextFileSync } from "../utils";

const input = readTextFileSync("./input") as string;

// PT1

const sumValidMults = (corruptedInput: string) => {
	const regex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
	let match;
	let totalSum = 0;

	while ((match = regex.exec(corruptedInput)) !== null) {
		const X = parseInt(match[1], 10);
		const Y = parseInt(match[2], 10);

		totalSum += X * Y;
	}

	return totalSum;
};

console.log(sumValidMults(input));

// PT2

const sumValidMulsWithConditionals = (corruptedInput: string) => {
	let isMulEnabled = true;
	const regex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)|do\(\)|don't\(\)/g;
	let match;
	let totalSum = 0;

	while ((match = regex.exec(corruptedInput)) !== null) {
		if (match[0] === "do()") {
			isMulEnabled = true;
		} else if (match[0] === "don't()") {
			isMulEnabled = false;
		} else {
			if (isMulEnabled) {
				const X = parseInt(match[1], 10);
				const Y = parseInt(match[2], 10);
				totalSum += X * Y;
			}
		}
	}

	return totalSum;
};

console.log(sumValidMulsWithConditionals(input));
