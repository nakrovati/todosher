import { describe, expect, it } from "vitest";
import createRandomId from "./createRandomId";

describe("createRandomId function", () => {
  it("gives correct random id", () => {
    const idRegexp = /\b\d{12}\b/;

    const id = createRandomId();

    expect(id).toMatch(idRegexp);
  });
});
