import MDX from "@/components/MDX"
import { getSinglePost } from "@/lib/posts.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await getSinglePost(`/blog/${params['*']}.md`)
  return { html: post.code }
}

export default function BlogPost() {
  const { html } = useLoaderData<typeof loader>()
  return <MDX html={html} />
}
