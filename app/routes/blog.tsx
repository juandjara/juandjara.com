import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import type { MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, useLocation, useOutlet } from "@remix-run/react"
import parseTags from "@/lib/parseTags"
import PostList from "@/components/PostList"

export async function loader() {
  const posts = await getPosts() as PostListItem[]
  return { posts }
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => [
  { title: data?.posts.find(p => location.pathname === `/blog/${p.slug}`)?.title || 'Blog' },
]

export default function PostsLayout() {
  const { posts } = useLoaderData<typeof loader>()
  const { pathname } = useLocation()
  const isRoot = pathname === '/blog'
  const slug = pathname.split('/').slice(-1)[0]
  const post = isRoot ? null : posts.find((p) => p.slug === slug)
  const link = isRoot ? '/' : '/blog'
  const title = post?.title || 'Blog'
  const children = useOutlet()

  return (
    <div>
      <BackLinkHeader to={link} />
      <Content>
        <h2 className="text-stone-600 dark:text-stone-100" style={{ marginBottom: 16 }}>{title}</h2>
        {post && (
          <div className="text-sm mb-10 text-stone-500 dark:text-stone-300 font-medium">
            {post.date && (
              <time dateTime={post.date} className="mr-3">
                {new Date(post.date).toLocaleDateString('es', { dateStyle: 'medium' })}
              </time>
            )}
            {parseTags(post).map((t) => (
              <Link
                key={t}
                to={`/tag/${t}`}
                className='mr-3 px-1.5 py-0.5 bg-white border border-stone-200 rounded-lg no-underline'>
                {t}
              </Link>
            ))}
          </div>
        )}
        {children ? children : (
          <PostList posts={posts} />
        )}
      </Content>
    </div>
  )
}
