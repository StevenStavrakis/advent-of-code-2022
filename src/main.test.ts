import { processPacks } from "./day-3";
import {describe, expect, it} from "vitest"
describe("test pack processing", () => {
    const sample1: string[] = ["aaaBBB"];
    const processedPacks = processPacks(sample1)
    expect(processedPacks).toBe([["aaa","BBB"]])
})