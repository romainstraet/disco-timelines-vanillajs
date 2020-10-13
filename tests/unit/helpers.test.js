import { normalizedString } from "../../src/helpers";

test("normalizedString()", () => {
  const outputString = normalizedString("The Beatles");
  expect(outputString).toBe("the-beatles");
});
