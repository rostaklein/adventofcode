import { getCounterBeforeInfiniteLoop } from ".";
import { clearTestInputData } from "../utils";

describe("day 8", () => {
  describe(getCounterBeforeInfiniteLoop.name, () => {
    it("does return an accumulator value of 5 before looping", () => {
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
      const result = getCounterBeforeInfiniteLoop(data);
      expect(result).toBe(5);
    });
  });
});
