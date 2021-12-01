import { fixInfiniteLoopAndGetCounter } from ".";
import { clearTestInputData } from "../utils";

describe("day 8", () => {
  describe(fixInfiniteLoopAndGetCounter.name, () => {
    it("can fix the loop and returns 8 as an accumulator value", () => {
      const input = `
              nop +0
              acc +1
              jmp +4
              acc +3
              jmp -3
              acc -99
              acc +1
              jmp -4
              acc +6
          `;

      const data = clearTestInputData(input);
      const result = fixInfiniteLoopAndGetCounter(data);
      expect(result).toBe(8);
    });
  });
});
