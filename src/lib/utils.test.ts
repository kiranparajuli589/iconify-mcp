import { describe, expect, it } from "bun:test"
import { getSetupGuidance, toPascalCase } from "./utils.js"

describe("utils", () => {
  it("converts kebab case to pascal case", () => {
    expect(toPascalCase("home-account")).toBe("HomeAccount")
  })

  it("loads setup guidance markdown for a supported framework", async () => {
    const setup = await getSetupGuidance("react")
    expect(setup).toContain("@iconify/react")
  })

  it("returns fallback text for unsupported framework", async () => {
    const setup = await getSetupGuidance("non-existent-framework" as any)
    expect(setup).toBe("Setup guidance for this framework is not yet available.")
  })
})
