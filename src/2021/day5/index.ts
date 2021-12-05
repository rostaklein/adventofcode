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
    this.coverBoardWithLines(
      this.instructions.filter(this.isHorizontalOrVertical)
    );

    return [...this.board.values()].filter((num) => num >= 2).length;
  }

  private coverBoardWithLines(instructions: Instruction[]) {
    for (const instruction of instructions) {
      const fromX = instruction.from[0];
      const toX = instruction.to[0];

      const fromY = instruction.from[1];
      const toY = instruction.to[1];

      if (fromY === toY) {
        this.drawLine(fromX, toX, "x", fromY);
      }

      if (fromX === toX) {
        this.drawLine(fromY, toY, "y", fromX);
      }
    }
  }

  private drawLine(
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
      const exists = this.board.get(mapKey);
      if (exists) {
        this.board.set(mapKey, exists + 1);
      } else {
        this.board.set(mapKey, 1);
      }
    }
  }

  private getMapKey(x: number, y: number) {
    return `${x},${y}`;
  }

  private isHorizontalOrVertical(instruction: Instruction) {
    return (
      instruction.from[0] === instruction.to[0] ||
      instruction.from[1] === instruction.to[1]
    );
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
