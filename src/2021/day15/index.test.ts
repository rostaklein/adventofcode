import { Chiton } from ".";
import { clearTestInputData } from "../utils";

describe("day 15", () => {
  describe(Chiton.name, () => {
    const input = `
    1163751742
    1381373672
    2136511328
    3694931569
    7463417111
    1319128137
    1359912421
    3125421639
    1293138521
    2311944581
      `;
    it("calculates the shortest distance", () => {
      const data = clearTestInputData(input);
      const calculator = new Chiton(data);
      const result = calculator.run();
      expect(result).toEqual(40);
    });
  });
});
