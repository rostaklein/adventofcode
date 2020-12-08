import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day8/data.txt");

type Instruction = {
  command: "nop" | "acc" | "jmp";
  direction: "+" | "-";
  steps: number;
};

const parseInstruction = (rawInstruction: string): Instruction => {
  const match = rawInstruction.match(
    /(?<command>nop|acc|jmp) (?<direction>\+|\-)(?<steps>\d*)/
  );
  if (!match) {
    throw new Error("Not a valid instruction");
  }
  return ({
    ...match.groups,
    steps: Number(match.groups?.steps),
  } as unknown) as Instruction;
};

export const getCounterBeforeInfiniteLoop = (
  rawInstructions: string[]
): number => {
  const instructions = rawInstructions.map(parseInstruction);
  const result = new InstructionProcessor(instructions).run();
  return result;
};

class InstructionProcessor {
  private currentInstructionIndex = 0;
  private processedInstructionsIndexes: Set<number> = new Set();
  private accumulator = 0;
  constructor(private instructions: Instruction[]) {}
  public run(): number {
    while (true) {
      if (this.processedInstructionsIndexes.has(this.currentInstructionIndex)) {
        return this.accumulator;
      }
      this.processedInstructionsIndexes.add(this.currentInstructionIndex);
      this.processInstruction(this.instructions[this.currentInstructionIndex]);
    }
  }
  private processInstruction(instr: Instruction) {
    switch (instr.command) {
      case "acc": {
        if (instr.direction === "+") {
          this.accumulator += instr.steps;
        } else {
          this.accumulator -= instr.steps;
        }
        this.nextInstruction();
        return;
      }
      case "nop": {
        this.nextInstruction();
        return;
      }
      case "jmp": {
        if (instr.direction === "+") {
          this.currentInstructionIndex += instr.steps;
        } else {
          this.currentInstructionIndex -= instr.steps;
        }
      }
    }
  }

  private nextInstruction(): void {
    this.currentInstructionIndex++;
  }
}

export const main = (): number => {
  console.log(getCounterBeforeInfiniteLoop(fileLines));
  return 0;
};
