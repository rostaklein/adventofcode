import { readLinesFromAFile } from "../utils";

const fileLines = readLinesFromAFile("./day12/data.txt");

export class PassagePathFinder {
  private caveSystem = new Map<string, string[]>();
  private possiblePaths = new Set<string>();

  constructor(private input: string[]) {
    for (const line of input) {
      const [from, to] = line.split("-");
      const exists = this.caveSystem.get(from) ?? [];

      this.caveSystem.set(from, [...exists, to]);
    }
    for (const line of input) {
      const [from, to] = line.split("-");
      const exists = this.caveSystem.get(to) ?? [];

      this.caveSystem.set(to, [...exists, from]);
    }
  }

  private traverseCaveSystem(
    cave: string,
    path: string[],
    allowRevisit = false
  ) {
    if (cave === "end") {
      this.possiblePaths.add(path.join(","));
    } else {
      this.caveSystem
        .get(cave)!
        .filter((c) => c !== "start")
        .filter((c) => {
          const smallCaves = path.filter((c) => c.toLowerCase() === c);
          const isRevisitComplete =
            new Set(smallCaves).size !== smallCaves.length;
          return (
            !smallCaves.includes(c) || // Big cave, or unvisited small cave
            (allowRevisit && !isRevisitComplete)
          );
        })
        .forEach((c) => this.traverseCaveSystem(c, [...path, c], allowRevisit));
    }

    return this.possiblePaths;
  }

  public getDistinctPaths(): string[] {
    return [...this.traverseCaveSystem("start", ["start"], true)].sort();
  }
}

export const main = () => {
  console.time(PassagePathFinder.name);
  const calc = new PassagePathFinder(fileLines);
  const result = calc.getDistinctPaths();
  console.log({ l: result.length });
  console.timeEnd(PassagePathFinder.name);
  return result;
};
