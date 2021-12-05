import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day5/data.txt");

type Position = [number, number];

type Instruction = {
  from: Position;
  to: Position;
};

export class HydroThermalVentureCalc {
  private instructions: Instruction[];
  private board = new Map<string, number>();

  constructor(input: string[]) {
    this.instructions = input.map(this.parseInstruction);
  }

  public run(): number {
    this.coverBoardWithLines(this.instructions);

    // console.log(this.board);

    this.drawBoard();

    return [...this.board.values()].filter((num) => num >= 2).length;
  }

  private coverBoardWithLines(instructions: Instruction[]) {
    for (const instruction of instructions) {
      const fromX = instruction.from[0];
      const toX = instruction.to[0];

      const fromY = instruction.from[1];
      const toY = instruction.to[1];

      if (fromY === toY) {
        this.drawStraightLine(fromX, toX, "y", fromY);
        // console.log("Y straight", instruction);
      } else if (fromX === toX) {
        this.drawStraightLine(fromY, toY, "x", fromX);
        // console.log("X straight", instruction);
      } else {
        // console.count("diagonal");
        // console.log("diagonal", instruction);
        this.drawDiagonalLine(instruction);
      }
    }
  }

  private drawBoard() {
    let table = "";
    for (const y of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      let line = "";
      for (const x of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        line += this.board.get(`${x},${y}`) ?? ".";
      }
      table += `${line}\n`;
    }
  }

  private drawStraightLine(
    from: number,
    to: number,
    otherCoordinate: "x" | "y",
    coordValue: number
  ) {
    const lowerNumber = from < to ? from : to;
    const higherNumber = from > to ? from : to;

    for (let i = lowerNumber; i <= higherNumber; i++) {
      const mapKey =
        otherCoordinate === "y"
          ? this.getMapKey(i, coordValue)
          : this.getMapKey(coordValue, i);
      this.markPositionVisited(mapKey);
    }
  }

  private drawDiagonalLine(instruction: Instruction) {
    const { from, to } = instruction;

    const directionX = from[0] < to[0] ? "forwards" : "backwards";
    const directionY = from[1] < to[1] ? "forwards" : "backwards";

    const distance = Math.abs(to[0] - from[0]);
    // console.log({ from, to });

    for (let i = 0; i <= distance; i++) {
      const movedX = directionX === "forwards" ? from[0] + i : from[0] - i;
      const movedY = directionY === "forwards" ? from[1] + i : from[1] - i;
      // console.log({ movedX, movedY });
      this.markPositionVisited(this.getMapKey(movedX, movedY));
    }
  }

  private markPositionVisited(mapKey: string) {
    const exists = this.board.get(mapKey);
    if (exists) {
      // console.log({ exists, mapKey });
      this.board.set(mapKey, exists + 1);
    } else {
      this.board.set(mapKey, 1);
    }
  }

  private getMapKey(x: number, y: number) {
    return `${x},${y}`;
  }

  private parseInstruction(input: string): Instruction {
    const [rawFrom, rawTo] = input.split(" -> ");

    const from = rawFrom.split(",").map(Number) as [number, number];
    const to = rawTo.split(",").map(Number) as [number, number];

    return {
      from,
      to,
    };
  }
}

export const main = () => {
  const result = new HydroThermalVentureCalc(fileLines).run();
  return result;
};
