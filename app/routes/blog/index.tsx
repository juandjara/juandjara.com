import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import PostList from "@/components/PostList"

type LoaderData = {
  posts: PostListItem[]
}

export async function loader() {
  const posts = await getPosts()
  return json<LoaderData>({ posts })
}

export const meta = {
  title: 'Juan D. Jara — Blog'
}

export default function BlogIndex() {
  const { posts } = useLoaderData<LoaderData>()
  return (
    <PostList posts={posts} />
  )
}