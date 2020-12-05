import { parseSeatCodeToSeat, splitInHalf } from ".";

describe.each`
  code            | row    | column | id
  ${"BFFFBBFRRR"} | ${70}  | ${7}   | ${567}
  ${"FFFBBBFRRR"} | ${14}  | ${7}   | ${119}
  ${"BBFFBBFRLL"} | ${102} | ${4}   | ${820}
`(
  "for code: $code, the seat is - row: $row, column: $column, id: $id",
  ({ code, row, column, id }) => {
    expect(parseSeatCodeToSeat(code)).toEqual({ row, column, id });
  }
);

describe.only(splitInHalf.name, () => {
  it("splits the array in half", () => {
    expect(splitInHalf(0, 127, "lower")).toEqual([0, 63]);
    expect(splitInHalf(0, 63, "upper")).toEqual([32, 63]);
    expect(splitInHalf(32, 63, "lower")).toEqual([32, 47]);
    expect(splitInHalf(32, 47, "upper")).toEqual([40, 47]);
    expect(splitInHalf(40, 47, "upper")).toEqual([44, 47]);
    expect(splitInHalf(44, 47, "lower")).toEqual([44, 45]);
    expect(splitInHalf(44, 45, "lower")).toEqual([44, 44]);
  });
});
