import { FrameworkEnum } from "@/lib/schemas.js"
import { z } from "zod"

function getFrameworkName(framework: z.infer<typeof FrameworkEnum>): string {
  if (framework === "raw-svg") return "Raw SVG"
  if (framework === "unplugin-icons") return "unplugin-icons"
  if (framework === "iconify-icon-webcomponent") return "IconifyIcon Web Component"
  return framework.charAt(0).toUpperCase() + framework.slice(1)
}

function getFrameworkDocLink(framework: z.infer<typeof FrameworkEnum>): string {
  switch (framework) {
    case "unplugin-icons":
      return "https://github.com/unplugin/unplugin-icons"
    case "iconify-icon-webcomponent":
      return "https://iconify.design/docs/icon-components/iconify-icon/"
    case "react":
      return "https://iconify.design/docs/icon-components/react/"
    case "vue":
      return "https://iconify.design/docs/icon-components/vue/"
    case "svelte":
      return "https://iconify.design/docs/icon-components/svelte/"
    case "lit":
      return "https://iconify.design/docs/icon-components/lit/"
    case "ember":
      return "https://iconify.design/docs/icon-components/ember/"
    default:
      return ""
  }
}

export async function buildFrameworkDetails(
  getSetupGuidance: (framework: z.infer<typeof FrameworkEnum>) => Promise<string>
): Promise<string> {
  const frameworkDetails = await Promise.all(
    FrameworkEnum.options.map(async (framework) => {
      const setup = await getSetupGuidance(framework as z.infer<typeof FrameworkEnum>)
      const frameworkName = getFrameworkName(framework as z.infer<typeof FrameworkEnum>)
      const docLink = getFrameworkDocLink(framework as z.infer<typeof FrameworkEnum>)

      return `## ${frameworkName}

### Setup
${setup}
${docLink ? `\nFor more details, see: ${docLink}` : ""}
`
    })
  )

  return frameworkDetails.join("\n")
}
