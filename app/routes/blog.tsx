import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import { json } from "@remix-run/node"
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react"

type LoaderData = {
  posts: PostListItem[]
}

export async function loader() {
  const posts = await getPosts('/blog')
  return json<LoaderData>({ posts })
}

export default function PostsLayout() {
  const { posts } = useLoaderData<LoaderData>()
  const { pathname } = useLocation()
  const isRoot = pathname === '/blog'
  const slug = pathname.split('/').slice(-1)[0]
  const meta = isRoot ? null : posts.find((p) => p.slug === slug)

  const link = isRoot ? '/' : '/blog'
  const title = meta ? meta.title : 'Blog'
  const tags = meta?.tag?.split(',') || []

  return (
    <div>
      <BackLinkHeader to={link} />
      <Content>
        <h2 className="text-stone-600" style={{ marginBottom: 16 }}>{title}</h2>
        {meta && (
          <div className="text-sm mb-10 text-stone-500 font-medium">
            {meta.date && (
              <time dateTime={meta.date} className="mr-3">
                {new Date(meta.date).toLocaleDateString('es', { dateStyle: 'medium' })}
              </time>
            )}
            {tags.map((t) => (
              <Link
                key={t}
                to={`/tag/${t}`}
                className='mr-3 px-1.5 py-0.5 bg-white border border-stone-200 rounded-lg no-underline'>
                {t}
              </Link>
            ))}
          </div>
        )}
        <Outlet />
      </Content>
    </div>
  )
}
