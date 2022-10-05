import type { PostListItem } from '@/lib/posts.server'
import { Link } from '@remix-run/react'

function formatDate(date: string) {
  return date && new Date(date).toLocaleDateString('es', { dateStyle: 'short' })
}

export default function PostList({ posts }: { posts: PostListItem[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <div className="space-x-3 flex justify-between items-center">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            <time className="text-sm font-medium text-stone-500 dark:text-stone-300" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  )
}
