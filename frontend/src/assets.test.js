import { describe, it, expect } from "vitest";
import { cityList } from "./assets/assets";

describe("Assets cityList", () => {
  it("should contain exactly 10 cities without empty slots", () => {
    expect(cityList).toBeDefined();
    expect(cityList.length).toBe(10);
    expect(cityList).toContain("Mumbai");
  });
});