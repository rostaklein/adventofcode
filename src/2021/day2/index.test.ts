import { calcPosition } from ".";
import { clearTestInputData } from "../utils";

describe("day 2", () => {
  describe(calcPosition.name, () => {
    it("calculates position correctly", () => {
      const input = `
              forward 5
              down 5
              forward 8
              up 3
              down 8
              forward 2     
          `;

      const data = clearTestInputData(input);
      const result = calcPosition(data);
      expect(result).toEqual({
        depth: 10,
        horizontal: 15,
      });
    });
  });
});
