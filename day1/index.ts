import { input } from "./input";

// PT1

const lines = input.split("\n").map((line) => line.split(/\s+/).map(Number));

const leftColumn = lines.map(([a, _]) => a).sort((a, b) => a - b);
const rightColumn = lines.map(([_, b]) => b).sort((a, b) => a - b);

const calculateDistance = (a: number, b: number) => Math.abs(a - b);

const totalDistance = leftColumn.reduce(
	(acc, left, i) => acc + calculateDistance(left, rightColumn[i]),
	0
);

console.log(totalDistance);

// PT2

const getSimilarityScore = (leftColumn: number[], rightColumn: number[]) => {
	const score = leftColumn
		.map((el) => {
			const occurences = rightColumn.filter((el2) => el2 === el).length;
			return occurences * el;
		})
		.reduce((acc, el) => acc + el, 0);

	return score;
};

console.log(getSimilarityScore(leftColumn, rightColumn));
