import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day2/data.txt");

const parseInstruction = (input: string) => {
  const [direction, value] = input.split(" ");

  return {
    direction,
    value: Number(value),
  } as {
    direction: "down" | "up" | "forward";
    value: number;
  };
};

export const calcPosition = (
  input: string[]
): { depth: number; horizontal: number } => {
  const instructions = input.map(parseInstruction);

  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  for (const instruction of instructions) {
    const val = instruction.value;
    switch (instruction.direction) {
      case "down":
        aim += val;
        break;
      case "up":
        aim -= val;
        break;
      case "forward":
        horizontal += val;
        depth += aim * val;
        break;
    }
  }

  return {
    depth,
    horizontal,
  };
};

export const main = () => {
  const { depth, horizontal } = calcPosition(fileLines);
  return {
    position: {
      depth,
      horizontal,
    },
    result: depth * horizontal,
  };
};
