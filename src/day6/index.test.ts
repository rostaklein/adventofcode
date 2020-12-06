import { getCommonLetters } from ".";

describe(getCommonLetters.name, () => {
  it.each`
    groupEntry   | commonLetters
    ${"abc"}     | ${"abc"}
    ${"a b c"}   | ${""}
    ${"ab ac"}   | ${"a"}
    ${"a a a a"} | ${"a"}
    ${"b"}       | ${"b"}
    ${"rf f tf"} | ${"f"}
  `(
    "for group entry: $groupEntry, common letters are: $commonLetters",
    ({ groupEntry, commonLetters }) => {
      expect(getCommonLetters(groupEntry)).toEqual(commonLetters);
    }
  );
});
