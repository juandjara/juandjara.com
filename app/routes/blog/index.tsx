import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import PostList from "@/components/PostList"

type LoaderData = {
  posts: PostListItem[]
}

export async function loader() {
  const posts = await getPosts('/blog')
  return json<LoaderData>({ posts })
}

export const meta = {
  title: 'Blog — Juan D. Jara'
}

export default function BlogIndex() {
  const { posts } = useLoaderData<LoaderData>()
  return <PostList posts={posts} />
}