import { getPosts } from "@/lib/posts.server"
import type { PostListItem } from "@/lib/posts.server"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import PostList from "@/components/PostList"
import parseTags from "@/lib/parseTags"

type LoaderData = {
  posts: PostListItem[]
}

export const meta: MetaFunction = ({ params }) => {
  return [{
    title: `# ${params.tag} - Juan D. Jara`
  }]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const tag = params.tag
  const posts = await getPosts()
  return {
    posts: tag ? posts.filter((p) => parseTags(p).includes(tag)) : []
  }
}

export default function Tag() {
  const { tag } = useParams()
  const { posts } = useLoaderData<LoaderData>()

  return (
    <div>
      <BackLinkHeader to='/' />
      <Content>
        <h2 className="text-stone-600 dark:text-stone-100"># {tag}</h2>
        <PostList posts={posts} />
      </Content>
    </div>
  )
}
