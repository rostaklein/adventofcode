import { LifeSupportRatingCalculator } from ".";
import { clearTestInputData } from "../utils";

describe("day 3", () => {
  describe(LifeSupportRatingCalculator.name, () => {
    it("calculates life support correctly", () => {
      const input = `
              00100
              11110
              10110
              10111
              10101
              01111
              00111
              11100
              10000
              11001
              00010
              01010     
          `;

      const data = clearTestInputData(input);
      const calculator = new LifeSupportRatingCalculator(data);
      const result = calculator.run();
      expect(result).toEqual(230);
    });
  });
});
