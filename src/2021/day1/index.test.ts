import { getTimesDepthIncreased } from ".";
import { clearTestInputData } from "../utils";

describe("day 1", () => {
  describe(getTimesDepthIncreased.name, () => {
    it("counts the times depth increased correctly (three-measurement sliding window)", () => {
      const input = `
              199
              200
              208
              210
              200
              207
              240
              269
              260
              263      
          `;

      const data = clearTestInputData(input);
      const result = getTimesDepthIncreased(data);
      expect(result).toBe(5);
    });
  });
});
