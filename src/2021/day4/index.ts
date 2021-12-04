import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day3/data.txt");

class Board {
  private columns = new Map<number, number[]>();
  public rows = new Map<number, number[]>();

  constructor(private input: string[]) {
    this.parseRows();
    this.parseColumns();
  }

  private parseRows() {
    let rowIndex = 0;
    for (const row of this.input) {
      const parsedRow = row.split(" ").filter(Boolean).map(Number);
      this.rows.set(rowIndex, parsedRow);
      rowIndex++;
    }
  }
  private parseColumns() {
    const columnLength = 5;

    let columnIndex = 0;
    while (columnIndex < columnLength) {
      const column: number[] = [];
      this.rows.forEach((value) => {
        column.push(value[columnIndex]);
      });

      this.columns.set(columnIndex, column);
      columnIndex++;
    }
  }
}

export class BingoPlayer {
  private readonly guesses: number[];
  private readonly boards: Board[];

  constructor(rawInput: string[]) {
    const [rawGuesses, ...rawBoards] = rawInput;
    this.guesses = rawGuesses.split(",").map(Number);

    this.boards = this.createBoards(rawBoards);
  }

  public run(): number {
    return 0;
  }

  private createBoards(boardsInput: string[]): Board[] {
    const totalBoards = boardsInput.length / 5;

    const boards: Board[] = [];

    let i = 1;
    while (i <= totalBoards) {
      const boardInput = boardsInput.slice((i - 1) * 5, i * 5);
      boards.push(new Board(boardInput));
      i++;
    }

    return boards;
  }
}

export const main = () => {
  const result = new BingoPlayer(fileLines).run();
  return result;
};
