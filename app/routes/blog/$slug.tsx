import MDX from "@/components/MDX"
import { getSinglePost } from "@/lib/posts.server"
import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

type LoaderData = {
  html: string
}

export async function loader({ params }: LoaderArgs) {
  const post = await getSinglePost(`/blog/${params.slug}.md`)
  return json<LoaderData>({ html: post.code })
}

export default function BlogPost() {
  const { html } = useLoaderData()
  return <MDX html={html} />
}
