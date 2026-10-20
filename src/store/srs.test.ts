import { describe, expect, it } from "vitest";
import { isDue, liveStreak, nextStreak, nextTermProgress } from "./srs";

describe("nextTermProgress", () => {
  it("promotes a new term to box 1 on a clean session", () => {
    expect(nextTermProgress(undefined, 3, 0, "2026-10-20")).toEqual({ box: 1, lastSeen: "2026-10-20", correct: 3, wrong: 0 });
  });
  it("caps at box 5", () => {
    expect(nextTermProgress({ box: 5, lastSeen: "2026-01-01", correct: 9, wrong: 0 }, 1, 0, "2026-10-20").box).toBe(5);
  });
  it("resets to box 0 on any mistake", () => {
    const p = nextTermProgress({ box: 4, lastSeen: "2026-01-01", correct: 9, wrong: 1 }, 2, 1, "2026-10-20");
    expect(p).toMatchObject({ box: 0, correct: 11, wrong: 2 });
  });
});

describe("isDue", () => {
  it("box 0 is due immediately", () => expect(isDue({ box: 0, lastSeen: "2026-10-20", correct: 0, wrong: 0 }, "2026-10-20")).toBe(true));
  it("box 2 waits three days", () => {
    const p = { box: 2, lastSeen: "2026-10-20", correct: 0, wrong: 0 };
    expect(isDue(p, "2026-10-22")).toBe(false);
    expect(isDue(p, "2026-10-23")).toBe(true);
  });
});

describe("streak", () => {
  it("starts at 1", () => expect(nextStreak({ count: 0, lastDay: "" }, "2026-10-20")).toEqual({ count: 1, lastDay: "2026-10-20" }));
  it("does not double count a day", () => expect(nextStreak({ count: 3, lastDay: "2026-10-20" }, "2026-10-20").count).toBe(3));
  it("extends across month boundaries", () => expect(nextStreak({ count: 3, lastDay: "2026-10-31" }, "2026-11-01").count).toBe(4));
  it("resets after a missed day", () => expect(nextStreak({ count: 3, lastDay: "2026-10-18" }, "2026-10-20").count).toBe(1));
  it("live streak lapses after a missed day", () => {
    expect(liveStreak({ count: 3, lastDay: "2026-10-19" }, "2026-10-20")).toBe(3);
    expect(liveStreak({ count: 3, lastDay: "2026-10-18" }, "2026-10-20")).toBe(0);
  });
});
