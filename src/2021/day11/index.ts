import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day11/data.txt");

type Board = number[][];

export class OctopusFlasher {
  private board: Board;
  constructor(private input: string[]) {
    this.board = input.map((row) => row.split("").map(Number));
  }

  public run() {
    return 0;
  }

  public getBoardAfterXSteps(steps: number) {
    this.board = this.incrementAllBoardByOne(this.board);
    return this.stringifyBoard(this.board);
  }

  private incrementAllBoardByOne(board: Board) {
    const modifiedBoard: Board = [];

    for (const row of board) {
      const modifiedRow: number[] = [];
      for (const num of row) {
        modifiedRow.push(num + 1);
      }
      modifiedBoard.push(modifiedRow);
    }

    return modifiedBoard;
  }

  private stringifyBoard(board: Board) {
    return board.map((row) => row.join("")).join("\n");
  }
}

export const main = () => {
  console.time(OctopusFlasher.name);
  const calc = new OctopusFlasher(fileLines);
  const result = calc.run();
  console.timeEnd(OctopusFlasher.name);
  return result;
};
