import { PassagePathFinder } from ".";
import { clearTestInputData } from "../utils";

describe("day 10", () => {
  describe(PassagePathFinder.name, () => {
    it("returns correct number of flashes after 100 steps", () => {
      const input = `
        start-A
        start-b
        A-c
        A-b
        b-d
        A-end
        b-end
      `;
      const data = clearTestInputData(input);
      const calculator = new PassagePathFinder(data);
      expect(calculator.getDistinctPaths()).toEqual([
        "start,A,b,A,c,A,end",
        "start,A,b,A,end",
        "start,A,b,end",
        "start,A,c,A,b,A,end",
        "start,A,c,A,b,end",
        "start,A,c,A,end",
        "start,A,end",
        "start,b,A,c,A,end",
        "start,b,A,end",
        "start,b,end",
      ]);
    });
  });
});
