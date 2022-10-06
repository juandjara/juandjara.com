import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import MDX from "@/components/MDX"
import ProjectList from "@/components/projects/ProjectList"
import css from '@/components/projects/projects.css'
import { getProjects, getSinglePost } from "@/lib/posts.server"
import { useLoaderData } from "@remix-run/react"

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}

export const meta = {
  title: 'Juan D. Jara — Proyectos'
}

export async function loader() {
  const [post, projects] = await Promise.all([
    getSinglePost('/projects.md'),
    getProjects()
  ])
  return { html: post.code, projects }
}

export default function Projects() {
  const { html, projects } = useLoaderData()
  return (
    <div>
      <BackLinkHeader to='/' />
      <Content>
        <h2 className="text-stone-600 dark:text-stone-100">Proyectos</h2>
        <MDX html={html} />
        <ProjectList projects={projects} />
      </Content>
    </div>
  )
}