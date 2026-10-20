import { describe, expect, it } from "vitest";
import { getTerm } from "../content";
import { checkPinyin, matchSpeech, normalizePinyin } from "./check";

describe("normalizePinyin", () => {
  it("ignores tones, spaces, case, and tone numbers", () => {
    for (const s of ["shù jù kù", "shujuku", "shu4 ju4 ku4", "Shu Ju Ku"]) expect(normalizePinyin(s)).toBe("shujuku");
  });
  it("treats ü, v and u: alike", () => {
    expect(normalizePinyin("lǜ")).toBe("lv");
    expect(normalizePinyin("lu:4")).toBe("lv");
    expect(normalizePinyin("lv")).toBe("lv");
  });
});

describe("checkPinyin", () => {
  it("accepts toneless input", () => expect(checkPinyin("shujuku", getTerm("shujuku"))).toBe(true));
  it("rejects wrong syllables", () => expect(checkPinyin("shujukuu", getTerm("shujuku"))).toBe(false));
  it("rejects empty input", () => expect(checkPinyin("  ", getTerm("shujuku"))).toBe(false));
  it("handles Latin tokens", () => expect(checkPinyin("ip dizhi", getTerm("ipdizhi"))).toBe(true));
});

describe("matchSpeech", () => {
  it("matches exact characters inside a longer transcript", () => {
    expect(matchSpeech(["这是数据库。"], getTerm("shujuku"))).toBe(true);
  });
  it("matches a homophone transcription", () => {
    expect(matchSpeech(["事物"], getTerm("shiwu"))).toBe(true);
  });
  it("checks every alternative", () => {
    expect(matchSpeech(["苹果", "缓存"], getTerm("huancun"))).toBe(true);
  });
  it("rejects a different word", () => {
    expect(matchSpeech(["数组"], getTerm("shujuku"))).toBe(false);
  });
  it("is case-insensitive for Latin parts", () => {
    expect(matchSpeech(["ip地址"], getTerm("ipdizhi"))).toBe(true);
  });
});
