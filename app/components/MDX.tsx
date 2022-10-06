import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"

export default function MDX({ html }: { html: string }) {
  const Component = useMemo(() => getMDXComponent(html), [html])
  return <Component />
}
