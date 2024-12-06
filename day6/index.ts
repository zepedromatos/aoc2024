import { input } from "./input.ts";

const parsedInput = input.trim().split("\n");
const rows = parsedInput.length;
const cols = parsedInput[0].length;

// Direction vectors (up, right, down, left)
const directions = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

// PT1

let guardRow, guardCol, guardDir;
for (let r = 0; r < rows; r++) {
	for (let c = 0; c < cols; c++) {
		if ("^>v<".includes(parsedInput[r][c])) {
			guardRow = r;
			guardCol = c;
			guardDir = "^>v<".indexOf(parsedInput[r][c]);
			break;
		}
	}
}

const visited = new Set([`${guardRow},${guardCol}`]);

while (true) {
	const [dr, dc] = directions[guardDir];
	const nextRow = guardRow + dr;
	const nextCol = guardCol + dc;

	if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
		break;
	}

	if (parsedInput[nextRow][nextCol] === "#") {
		guardDir = (guardDir + 1) % 4;
	} else {
		guardRow = nextRow;
		guardCol = nextCol;
		visited.add(`${guardRow},${guardCol}`);
	}
}

// PT2

let startRow, startCol, startDir;
for (let r = 0; r < rows; r++) {
	for (let c = 0; c < cols; c++) {
		if ("^>v<".includes(parsedInput[r][c])) {
			startRow = r;
			startCol = c;
			startDir = "^>v<".indexOf(parsedInput[r][c]);
			break;
		}
	}
}

const simulateWithObstacle = (obstacleRow, obstacleCol) => {
	let guardRow = startRow,
		guardCol = startCol,
		guardDir = startDir;
	const visited = new Set();
	visited.add(`${guardRow},${guardCol},${guardDir}`);

	while (true) {
		const [dr, dc] = directions[guardDir];
		const nextRow = guardRow + dr;
		const nextCol = guardCol + dc;

		if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
			return false;
		}

		const nextCell =
			nextRow === obstacleRow && nextCol === obstacleCol
				? "#"
				: parsedInput[nextRow][nextCol];
		if (nextCell === "#") {
			guardDir = (guardDir + 1) % 4;
		} else {
			guardRow = nextRow;
			guardCol = nextCol;
		}

		const state = `${guardRow},${guardCol},${guardDir}`;
		if (visited.has(state)) {
			return true;
		}
		visited.add(state);
	}
};

let validPositions = 0;

for (let r = 0; r < rows; r++) {
	for (let c = 0; c < cols; c++) {
		if (parsedInput[r][c] === "#" || (r === startRow && c === startCol)) {
			continue;
		}

		if (simulateWithObstacle(r, c)) {
			validPositions++;
		}
	}
}

console.log(
	`Number of valid positions for a new obstruction: ${validPositions}`
);

console.log(`Distinct positions visited: ${visited.size}`);
