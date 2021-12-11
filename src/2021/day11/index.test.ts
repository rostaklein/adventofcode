import { OctopusFlasher } from ".";
import { clearTestInputData } from "../utils";

describe("day 10", () => {
  describe(OctopusFlasher.name, () => {
    const input = `
    11111
        19991
        19191
        19991
        11111`;

    it.each([
      {
        step: 0,
        board: `
        11111
        19991
        19191
        19991
        11111
      `,
      },
      {
        step: 1,
        board: `
        34543
        40004
        50005
        40004
        34543
      `,
      },
      {
        step: 2,
        board: `
        45654
        51115
        61116
        51115
        45654
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
