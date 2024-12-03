import { readFileSync } from "fs";

export const calculateDistance = (a: number, b: number) => Math.abs(a - b);

export const getLines = (input: string): number[][] =>
	input.split("\n").map((line) => line.split(/\s+/).map(Number));

export const readTextFileSync = (path: string) => {
	try {
		const data = readFileSync(`./${path}.txt`, "utf-8");
		return data;
	} catch (error) {
		console.error("Error reading file:", error);
	}
};
