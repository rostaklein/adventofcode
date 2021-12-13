import { TransparentOrigami } from ".";
import { clearTestInputData } from "../utils";

describe("day 13", () => {
  describe(TransparentOrigami.name, () => {
    it("puts dots correctly on the map", () => {
      const input = `
      6,10
      0,14
      9,10
      0,3
      10,4
      4,11
      6,0
      6,12
      4,1
      0,13
      10,12
      3,4
      3,0
      8,4
      1,10
      2,14
      8,10
      9,0
      `;
      const data = clearTestInputData(input);
      const calculator = new TransparentOrigami(data);
      expect(calculator.getDotsOnPaper()).toEqual(
        clearTestInputData(`...#..#..#.
        ....#......
        ...........
        #..........
        ...#....#.#
        ...........
        ...........
        ...........
        ...........
        ...........
        .#....#.##.
        ....#......
        ......#...#
        #..........
        #.#........
        `).join("\n")
      );
    });
  });
});
