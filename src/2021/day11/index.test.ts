import { OctopusFlasher } from ".";
import { clearTestInputData } from "../utils";

describe("day 10", () => {
  describe(OctopusFlasher.name, () => {
    const input = `
    5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`;

    it.each([
      {
        step: 1,
        board: `
          6594254334
          3856965822
          6375667284
          7252447257
          7468496589
          5278635756
          3287952832
          7993992245
          5957959665
          6394862637
      `,
      },
    ])("calculates correctly $step step", ({ step, board }) => {
      const data = clearTestInputData(input);
      const calculator = new OctopusFlasher(data);
      expect(calculator.getBoardAfterXSteps(step)).toEqual(
        clearTestInputData(board).join("\n")
      );
    });
  });
});
