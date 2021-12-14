import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day14/data.txt");

export class ExtendedPolymerization {
  private insertionRules = new Map<string, string>();
  private doubles = new Map<string, number>();

  constructor(private input: string[]) {
    const template = input[0];

    this.parseStringToDoubles(template);
    input.splice(0, 1);

    for (const insertionRule of input) {
      const [between, insert] = insertionRule.split(" -> ");
      this.insertionRules.set(between, insert);
    }
  }

  private parseStringToDoubles(string: string) {
    for (let i = 0; i < string.length - 1; i++) {
      const double = string.substring(i, i + 2);
      this.addDouble(this.doubles, double, 1);
    }
  }

  private addDouble(m: Map<string, number>, k: string, v = 1) {
    m.set(k, (m.get(k) ?? 0) + v);
  }

  public run(steps: number) {
    for (let i = 0; i < steps; i++) {
      this.polymerByInsertionRules();
    }

    const mapOfOccurrence = new Map<string, number>();
    for (const [double, value] of this.doubles) {
      for (const i of [0, 1]) {
        this.addDouble(mapOfOccurrence, double[i], value);
      }
    }

    const min = Math.min(...mapOfOccurrence.values());
    const max = Math.max(...mapOfOccurrence.values());

    return Math.ceil(max / 2) - Math.ceil(min / 2);
  }

  private polymerByInsertionRules() {
    const newDoubles = new Map<string, number>();

    for (const [double, value] of this.doubles) {
      const rule = this.insertionRules.get(double);
      if (rule) {
        this.addDouble(newDoubles, `${double[0]}${rule}`, value);
        this.addDouble(newDoubles, `${rule}${double[1]}`, value);
      } else {
        this.addDouble(newDoubles, double, value);
      }
    }

    this.doubles = newDoubles;
  }
}

export const main = () => {
  console.time(ExtendedPolymerization.name);
  const calc = new ExtendedPolymerization(fileLines);
  const result = calc.run(40);
  console.timeEnd(ExtendedPolymerization.name);
  return result;
};
