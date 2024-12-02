import { input } from "./input";
import { calculateDistance, getLines } from "../utils";

// PT1

const lines = getLines(input);

const leftColumn = lines.map(([a, _]) => a).sort((a, b) => a - b);
const rightColumn = lines.map(([_, b]) => b).sort((a, b) => a - b);

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
