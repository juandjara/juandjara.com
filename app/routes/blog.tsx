import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import { json } from "@remix-run/node"
import { Outlet, useLoaderData, useLocation } from "@remix-run/react"

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

  return (
    <div className='max-w-prose'>
      <BackLinkHeader to={link} />
      <Content>
        <h2 className="text-stone-600">{title}</h2>
        <Outlet />
      </Content>
    </div>
  )
}
