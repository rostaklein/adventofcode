import { ExtendedPolymerization } from ".";
import { clearTestInputData } from "../utils";

describe("day 14", () => {
  describe(ExtendedPolymerization.name, () => {
    const input = `
    NNCB

    CH -> B
    HH -> N
    CB -> H
    NH -> C
    HB -> C
    HC -> B
    HN -> C
    NN -> C
    BH -> H
    NC -> B
    NB -> B
    BN -> B
    BB -> N
    BC -> B
    CC -> N
    CN -> C
      `;
    it("returns correct result after 10 steps", () => {
      const data = clearTestInputData(input);
      const calculator = new ExtendedPolymerization(data);
      const result = calculator.run(40);
      expect(result).toEqual(2188189693529);
      // const str = calculator.getDoublesString();
      // expect(str).toEqual("");
    });
  });
});
