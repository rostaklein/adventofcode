import { LowPointCalculator } from ".";
import { clearTestInputData } from "../utils";

describe("day 9", () => {
  describe(LowPointCalculator.name, () => {
    it("finds low points", () => {
      const input = `
            2199943210
            3987894921
            9856789892
            8767896789
            9899965678
          `;

      const data = clearTestInputData(input);
      const calculator = new LowPointCalculator(data);
      expect(calculator.getLowPoints()).toEqual([1, 0, 5, 5]);
      expect(calculator.run()).toEqual(15);
    });
  });
});