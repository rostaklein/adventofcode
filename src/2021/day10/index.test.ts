import { SyntaxScoring } from ".";
import { clearTestInputData } from "../utils";

describe("day 10", () => {
  describe(SyntaxScoring.name, () => {
    it("finds syntax errors", () => {
      const input = `
            [({(<(())[]>[[{[]{<()<>>
            [(()[<>])]({[<{<<[]>>(
            {([(<{}[<>[]}>{[]{[(<()>
            (((({<>}<{<{<>}{[]{[]{}
            [[<[([]))<([[{}[[()]]]
            [{[{({}]{}}([{[{{{}}([]
            {<[[]]>}<{[{[{[]{()[[[]
            [<(<(<(<{}))><([]([]()
            <{([([[(<>()){}]>(<<{{
            <{([{{}}[<[[[<>{}]]]>[]]
          `;

      const data = clearTestInputData(input);
      const calculator = new SyntaxScoring(data);
      expect(calculator.run()).toEqual(26397);
    });
  });
});
