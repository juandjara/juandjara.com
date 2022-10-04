import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

type LoaderData = {
  posts: PostListItem[]
}

export async function loader() {
  const posts = await getPosts('/blog')
  return json<LoaderData>({ posts })
}

function formatDate(date: string) {
  return date && new Date(date).toLocaleDateString('es', { dateStyle: 'short' })
}

export const meta = {
  title: 'Juan D. Jara — Blog'
}

export default function BlogIndex() {
  const { posts } = useLoaderData<LoaderData>()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <div className="space-x-3 flex justify-between items-center">
            <Link className="" to={post.slug}>{post.title}</Link>
            <time className="text-sm font-medium text-stone-500" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  )
}