import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day10/data.txt");

const VALID_PAIRS = [
  { opening: "(", closing: ")" },
  { opening: "[", closing: "]" },
  { opening: "{", closing: "}" },
  { opening: "<", closing: ">" },
] as const;

const VALID_PAIRS_STRINGS = ["()", "{}", "[]", "<>"] as const;

export class SyntaxScoring {
  constructor(private input: string[]) {}

  public run() {
    const purgedLines = [];
    for (const line of this.input) {
      const purgedLine = this.removeValidChunks(line);
      purgedLines.push(purgedLine);
    }

    // console.log({ purgedLines, l: purgedLines.length });
    // console.log(purgedLines.map(this.getFirstClosingTag));
    // console.log(
    //   purgedLines.map(this.getFirstClosingTag).map(this.getScoreForClosingTag)
    // );

    return purgedLines
      .map(this.getFirstClosingTag)
      .map(this.getScoreForClosingTag)
      .reduce<number>((acc, curr) => (acc += curr), 0);
  }

  private removeValidChunks(line: string) {
    let purgedLine = line;
    for (const validPair of VALID_PAIRS_STRINGS) {
      purgedLine = purgedLine.replace(validPair, "");
    }

    for (const validPair of VALID_PAIRS_STRINGS) {
      if (purgedLine.includes(validPair)) {
        purgedLine = this.removeValidChunks(purgedLine);
      }
    }
    return purgedLine;
  }

  private getFirstClosingTag(line: string): string | null {
    for (const char of line) {
      for (const { closing } of VALID_PAIRS) {
        if (char === closing) {
          return char;
        }
      }
    }
    return null;
  }

  private getScoreForClosingTag(tag: string | null) {
    switch (tag) {
      case ")":
        return 3;
      case "]":
        return 57;
      case "}":
        return 1197;
      case ">":
        return 25137;
      default:
        return 0;
    }
  }
}

export const main = () => {
  console.time(SyntaxScoring.name);
  const calc = new SyntaxScoring(fileLines);
  const result = calc.run();
  console.timeEnd(SyntaxScoring.name);
  return result;
};
