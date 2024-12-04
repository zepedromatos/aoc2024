import { input } from "./input";

const parsedInput = input.split("\n");

type Coord = [x: number, y: number];

const Grid = {
  width: 0,
  height: 0,

  cells: [] as string[][],

  at(coord: Coord) {
    try {
      return this.cells[coord[1]][coord[0]];
    } catch (_error) {
      return null;
    }
  },

  scanForXMAS(start: Coord) {
    return (
      [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
      ] as Coord[]
    )
      .map((step) => this.searchForXMAS(start, step))
      .reduce((sum, val) => sum + val, 0);
  },

  searchForXMAS(pos: Coord, step: Coord): number {
    let found = "";
    let curpos = pos;

    while (found.length < 4) {
      const nchar = this.at(curpos);

      if (nchar === null) {
        return 0;
      }

      found += nchar;
      curpos = [curpos[0] + step[0], curpos[1] + step[1]];
    }

    return ["XMAS", "SAMX"].includes(found) ? 1 : 0;
  },

  scanForCrossMAS(start: Coord): number {
    const check = [
      this.at([start[0] - 1, start[1] - 1]), // Top Left
      this.at([start[0] + 1, start[1] - 1]), // Top Right
      this.at([start[0] + 1, start[1] + 1]), // Bottom Right
      this.at([start[0] - 1, start[1] + 1]), // Bottom Left
    ];

    if (check.some((val) => val === null)) {
      return 0;
    }

    const oneCross =
      (check[0] === "M" && check[2] === "S") ||
      (check[0] === "S" && check[2] === "M");

    const twoCross =
      (check[1] == "M" && check[3] === "S") ||
      (check[1] === "S" && check[3] === "M");

    return oneCross && twoCross ? 1 : 0;
  },
};

const findAllIndices = (chars: string[], search: string) => {
  return chars
    .map((chr, ix) => (chr === search ? ix : -1))
    .filter((pos) => pos >= 0);
};

const solve = (
  input: string[],
  indexChar: string,
  scannerFn: "scanForXMAS" | "scanForCrossMAS"
) => {
  Grid.width = input[0].length;
  Grid.height = input.length;

  const cPos = [] as Coord[];

  Grid.cells = input.map((line, y) => {
    const result = line.split("");

    findAllIndices(result, indexChar)
      .map((x) => [x, y] as Coord)
      .forEach((coord) => cPos.push(coord));

    return result;
  });

  return cPos
    .map((cp) => Grid[scannerFn](cp))
    .reduce((sum, val) => sum + val, 0);
};

export const part1 = (input: string[]) => solve(input, "X", "scanForXMAS");
export const part2 = (input: string[]) => solve(input, "A", "scanForCrossMAS");

console.log(part1(parsedInput));
console.log(part2(parsedInput));
