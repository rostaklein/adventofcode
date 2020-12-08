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

export const fixInfiniteLoopAndGetCounter = (
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
  private instructionsModifier: InstructionsModifier;

  constructor(private instructions: Instruction[]) {
    this.instructionsModifier = new InstructionsModifier(instructions);
  }

  public run(): number {
    while (true) {
      if (this.isCorrupted) {
        this.reset();
        this.tryDifferentInstructions();
      }
      if (this.currentInstructionIndex === this.lastInstructionIndex) {
        this.processInstruction(
          this.instructions[this.currentInstructionIndex]
        );
        // debugger;
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

  private get lastInstructionIndex(): number {
    return this.instructions.length - 1;
  }

  private get isCorrupted(): boolean {
    return this.processedInstructionsIndexes.has(this.currentInstructionIndex);
  }

  private reset() {
    this.accumulator = 0;
    this.currentInstructionIndex = 0;
    this.processedInstructionsIndexes = new Set();
  }

  private tryDifferentInstructions() {
    this.instructions = this.instructionsModifier.getNextVariant();
    // debugger;
  }
}

class InstructionsModifier {
  private modifiedInstructionsIndexes = new Set();
  constructor(private initialInstructions: Instruction[]) {}

  public getNextVariant(): Instruction[] {
    return this.modifyNextRule();
  }

  private modifyNextRule() {
    let modifiedThisTime = false;
    return this.initialInstructions.map((instr, i) => {
      if (instr.command === "acc") {
        return instr;
      }
      if (!this.modifiedInstructionsIndexes.has(i) && !modifiedThisTime) {
        modifiedThisTime = true;
        this.modifiedInstructionsIndexes.add(i);
        return {
          ...instr,
          command: instr.command === "jmp" ? "nop" : "jmp",
        } as Instruction;
      }
      return instr;
    });
  }
}

export const main = (): number => {
  return fixInfiniteLoopAndGetCounter(fileLines);
};
