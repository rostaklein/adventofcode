import { CrabFuelCalculator } from ".";
import { clearTestInputData } from "../utils";

describe("day 7", () => {
  describe(CrabFuelCalculator.name, () => {
    it("returns correct number of overlapping lines", () => {
      const input = `
              16,1,2,0,4,2,7,1,2,14   
          `;

      const data = clearTestInputData(input);
      const calculator = new CrabFuelCalculator(data);
      const result = calculator.run();
      expect(result).toEqual(37);
    });
  });
});
