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
      expect(result).toEqual(168);
    });
  });
  describe(CrabFuelCalculator.stepFuelCalculator.name, () => {
    it.each([
      [16, 5, 66],
      [1, 5, 10],
      [2, 5, 6],
      [0, 5, 15],
      [4, 5, 1],
      [2, 5, 6],
      [2, 2, 0],
    ])("Move from %s to %s: %s fuel", (from, to, expectedFuel) => {
      const fuel = CrabFuelCalculator.stepFuelCalculator(from, to);
      expect(fuel).toEqual(expectedFuel);
    });
  });
});
