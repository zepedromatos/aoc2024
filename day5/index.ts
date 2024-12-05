import { input } from "./input";

interface PageRule {
	before: number;
	after: number;
}

// PT1

const parseInput = (
	input: string
): { rules: PageRule[]; updates: number[][] } => {
	const lines = input.trim().split("\n");

	const ruleSectionEnd = lines.findIndex((line) => line.includes(","));

	const rules: PageRule[] = lines.slice(0, ruleSectionEnd).map((line) => {
		const [before, after] = line.split("|").map(Number);
		return { before, after };
	});

	const updates: number[][] = lines
		.slice(ruleSectionEnd)
		.map((line) => line.split(",").map(Number));

	return { rules, updates };
};

const isUpdateInOrder = (update: number[], rules: PageRule[]): boolean => {
	const relevantRules = rules.filter(
		(rule) => update.includes(rule.before) && update.includes(rule.after)
	);

	for (const rule of relevantRules) {
		const beforeIndex = update.indexOf(rule.before);
		const afterIndex = update.indexOf(rule.after);

		if (beforeIndex > afterIndex) {
			return false;
		}
	}

	return true;
};

const findMiddlePageOfCorrectUpdates = (input: string): number => {
	const { rules, updates } = parseInput(input);

	let middlePageSum = 0;

	for (const update of updates) {
		if (isUpdateInOrder(update, rules)) {
			const middleIndex = Math.floor(update.length / 2);
			middlePageSum += update[middleIndex];
		}
	}

	return middlePageSum;
};

console.log(findMiddlePageOfCorrectUpdates(input));

// PT2

const correctUpdateOrder = (update: number[], rules: PageRule[]): number[] => {
	let correctedUpdate = [...update];

	let changed;
	do {
		changed = false;

		const relevantRules = rules.filter(
			(rule) =>
				correctedUpdate.includes(rule.before) &&
				correctedUpdate.includes(rule.after)
		);

		for (const rule of relevantRules) {
			const beforeIndex = correctedUpdate.indexOf(rule.before);
			const afterIndex = correctedUpdate.indexOf(rule.after);

			if (beforeIndex > afterIndex) {
				[correctedUpdate[beforeIndex], correctedUpdate[afterIndex]] = [
					correctedUpdate[afterIndex],
					correctedUpdate[beforeIndex],
				];
				changed = true;
				break;
			}
		}
	} while (changed);

	return correctedUpdate;
};

const findMiddlePageOfIncorrectUpdates = (input: string): number => {
	const { rules, updates } = parseInput(input);

	let middlePageSum = 0;

	for (const update of updates) {
		if (!isUpdateInOrder(update, rules)) {
			const correctedUpdate = correctUpdateOrder(update, rules);
			const middleIndex = Math.floor(correctedUpdate.length / 2);
			middlePageSum += correctedUpdate[middleIndex];
		}
	}

	return middlePageSum;
};

console.log(findMiddlePageOfIncorrectUpdates(input));
