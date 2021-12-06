import { LanternfishSpawner } from ".";
import { clearTestInputData } from "../utils";

describe("day 6", () => {
  describe(LanternfishSpawner.name, () => {
    it("returns correct number of overlapping lines", () => {
      const input = `
            3,4,3,1,2   
          `;

      const data = clearTestInputData(input);
      const calculator = new LanternfishSpawner(data);
      const result = calculator.run(18);
      expect(result).toEqual(26);
    });
  });
});
