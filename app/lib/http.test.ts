import { describe, expect, it } from "vitest";
import { isSameOrigin } from "./http";

function req(headers: Record<string, string>, host = "example.com"): Request {
  return new Request("https://example.com/api/marks", {
    method: "PUT",
    headers: { host, ...headers },
  });
}

describe("isSameOrigin", () => {
  it("allows requests without Origin (curl / native clients)", () => {
    expect(isSameOrigin(req({}))).toBe(true);
  });

  it("allows matching origins", () => {
    expect(isSameOrigin(req({ origin: "https://example.com" }))).toBe(true);
  });

  it("rejects cross-site origins", () => {
    expect(isSameOrigin(req({ origin: "https://evil.test" }))).toBe(false);
  });
});
