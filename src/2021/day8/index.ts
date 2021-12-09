import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day8/data.txt");

export class SevenSegmentSearch {
  private stringToNumberMap = new Map<number, string>();
  private inputOutputValues: {
    input: string[];
    output: string[];
  }[];

  constructor(input: string[]) {
    this.inputOutputValues = [];
    input.forEach((item) => {
      const [inp, output] = item.split(" | ");

      this.inputOutputValues.push({
        input: inp.split(" "),
        output: output.split(" "),
      });
    });
  }

  private determineTopRight(input: string[]) {
    const eight = this.stringToNumberMap.get(8);
    const six = this.stringToNumberMap.get(6);

    const topRightPart = eight
      ?.split("")
      .filter((letter) => !six?.split("").includes(letter));

    return topRightPart![0];
  }

  private getEasyNumbers(strings: string[]) {
    for (const string of strings) {
      switch (string.length) {
        case 2:
          this.stringToNumberMap.set(1, string);
          break;
        case 3:
          this.stringToNumberMap.set(7, string);
          break;
        case 4:
          this.stringToNumberMap.set(4, string);
          break;
        case 7:
          this.stringToNumberMap.set(8, string);
          break;
        default:
          break;
      }
    }
  }

  private determineNine(input: string[]) {
    const four = this.stringToNumberMap.get(4);
    const nine = input.find(
      (inp) => inp.length === 6 && this.includesAllSubstringLetters(inp, four!)
    );

    this.stringToNumberMap.set(9, nine!);
  }

  private determineZero(input: string[]) {
    const remaining = this.filterOutRemaining(input);

    const one = this.stringToNumberMap.get(1);

    const zero = remaining.find(
      (inp) => inp.length === 6 && this.includesAllSubstringLetters(inp, one!)
    );

    this.stringToNumberMap.set(0, zero!);
  }

  private determineSix(input: string[]) {
    const remaining = this.filterOutRemaining(input);

    const six = remaining.find((inp) => inp.length === 6);

    this.stringToNumberMap.set(6, six!);
  }

  private determineThree(input: string[]) {
    const remaining = this.filterOutRemaining(input);

    const seven = this.stringToNumberMap.get(7);

    const three = remaining.find(
      (inp) => inp.length === 5 && this.includesAllSubstringLetters(inp, seven!)
    );

    this.stringToNumberMap.set(3, three!);
  }

  private determineTwo(input: string[], topRight: string) {
    const remaining = this.filterOutRemaining(input);

    const two = remaining.find((str) => str.includes(topRight))!;

    this.stringToNumberMap.set(2, two!);
  }

  private determineFive(input: string[]) {
    const remaining = this.filterOutRemaining(input);

    const five = remaining[0];

    this.stringToNumberMap.set(5, five);
  }

  public run() {
    let sum = 0;

    for (const row of this.inputOutputValues) {
      this.determineNumbers(row.input);
      sum += this.getOutput(row.output);

      this.stringToNumberMap = new Map();
    }

    return sum;
  }

  private determineNumbers(row: string[]) {
    this.getEasyNumbers(row);
    this.determineNine(row);
    this.determineZero(row);
    this.determineSix(row);
    this.determineThree(row);

    const topRightPart = this.determineTopRight(row);
    this.determineTwo(row, topRightPart);
    this.determineFive(row);
  }

  private getOutput(outputRow: string[]) {
    let outputNum = "";
    for (const output of outputRow) {
      if ([...this.stringToNumberMap.values()].includes(undefined!)) {
        console.log(this.stringToNumberMap);
      }
      for (const [number, string] of this.stringToNumberMap) {
        const permutations = this.permut(string) as string[];
        if (permutations.some((perm) => perm === output)) {
          outputNum += number;
        }
      }
    }

    return Number(outputNum);
  }

  private filterOutRemaining(strings: string[]) {
    return strings.filter((str) => {
      return ![...this.stringToNumberMap.values()].includes(str);
    });
  }

  private includesAllSubstringLetters(string: string, substring: string) {
    for (const letter of substring) {
      if (!string.includes(letter)) {
        return false;
      }
    }
    return true;
  }

  private permut(string: string): string[] | string {
    if (string.length < 2) return string;
    var permutations = []; // This array will hold our permutations
    for (var i = 0; i < string.length; i++) {
      var char = string[i];

      // Cause we don't want any duplicates:
      if (string.indexOf(char) != i)
        // if char was used already
        continue; // skip it this time

      var remainingString =
        string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

      for (var subPermutation of this.permut(remainingString))
        permutations.push(char + subPermutation);
    }
    return permutations;
  }
}

export const main = () => {
  console.time(SevenSegmentSearch.name);
  const result = new SevenSegmentSearch(fileLines).run();
  console.timeEnd(SevenSegmentSearch.name);
  return result;
};
