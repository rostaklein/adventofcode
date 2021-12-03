import { calcPowerConsumption } from ".";
import { clearTestInputData } from "../utils";

describe("day 2", () => {
  describe(calcPowerConsumption.name, () => {
    it("calculates position correctly", () => {
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
      const result = calcPowerConsumption(data);
      expect(result).toEqual(198);
    });
  });
});
