import BackLink from "@/components/BackLink"
import Content from "@/components/Content"
import Header from "@/components/Header"
import MDX from "@/components/MDX"
import ProjectList from "@/components/projects/ProjectList"
import css from '@/components/projects/projects.css?url'
import { getProjects, getSinglePost } from "@/lib/posts.server"
import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}

export const meta: MetaFunction = () => [
  { title: 'Juan D. Jara — Proyectos' },
]

export const handle = {
  post: 'projects.md'
}

export async function loader() {
  const [post, projects] = await Promise.all([
    getSinglePost('/projects.md'),
    getProjects()
  ])
  return { html: post.code, projects }
}

export default function Projects() {
  const { html, projects } = useLoaderData<typeof loader>()
  return (
    <div>
      <Header />
      <div className="mt-6">
        <BackLink to='/' />
      </div>
      <Content>
        <MDX html={html} />
        <ProjectList projects={projects} />
      </Content>
    </div>
  )
}
