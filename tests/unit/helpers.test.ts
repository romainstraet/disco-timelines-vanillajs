import { normalizeString } from "../../src/helpers";

test("normalizedString()", () => {
  expect(normalizeString("The Beatles")).toBe("the-beatles");
  expect(normalizeString("Ola 1a1a 75")).toBe("ola-1a1a-75");
});
