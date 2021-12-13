import { TransparentOrigami } from ".";
import { clearTestInputData } from "../utils";

describe("day 13", () => {
  describe(TransparentOrigami.name, () => {
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

      fold along y=7
      fold along x=5
      `;
    it("puts dots correctly on the map", () => {
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
    it("should look correctly after first fold", () => {
      const data = clearTestInputData(input);
      const calculator = new TransparentOrigami(data);
      calculator.getDotsOnPaper();
      expect(calculator.foldByFirstInstruction()).toEqual(
        clearTestInputData(`#.##..#..#.
      #...#......
      ......#...#
      #...#......
      .#.#..#.###
      ...........
      ...........`).join("\n")
      );
      expect(calculator.getNumberOfVisibleDots()).toEqual(17);
    });
  });
});
