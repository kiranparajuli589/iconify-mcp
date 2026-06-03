import { describe, expect, it } from "bun:test"
import { FrameworkEnum } from "./schemas.js"
import { buildFrameworkDetails } from "./usageGuidance.js"

describe("buildFrameworkDetails", () => {
  it("resolves async setup guidance values before joining output", async () => {
    const seen: string[] = []
    const output = await buildFrameworkDetails(async (framework) => {
      seen.push(framework)
      await Promise.resolve()
      return `setup-${framework}`
    })

    expect(seen.length).toBe(FrameworkEnum.options.length)
    expect(output).toContain("## React")
    expect(output).toContain("setup-react")
    expect(output).not.toContain("[object Promise]")
  })
})
