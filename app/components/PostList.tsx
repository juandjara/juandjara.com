import type { PostListItem } from '@/lib/posts.server'
import { Link } from '@remix-run/react'

function formatDate(date: string) {
  return date && new Date(date).toLocaleDateString('es', { dateStyle: 'short' })
}

export default function PostList({ posts }: { posts: PostListItem[] }) {
  return (
    <div className='not-prose'>      
      <ul className='mt-10'>
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <div className="space-x-3 flex justify-between items-center">
              <Link className='text-orange-600 dark:text-yellow-600' to={`/blog/${post.slug}`}>{post.title}</Link>
              <time className="text-sm font-medium text-stone-500 dark:text-stone-300" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
