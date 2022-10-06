import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import MDX from "@/components/MDX"
import ProjectList from "@/components/projects/ProjectList"
import css from '@/components/projects/projects.css'
import { getSinglePost } from "@/lib/posts.server"
import { useLoaderData } from "@remix-run/react"

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}

export const meta = {
  title: 'Proyectos — Juan D. Jara'
}

export async function loader() {
  const post = await getSinglePost('/projects.md')
  return { html: post.code }
}

export default function Projects() {
  const { html } = useLoaderData()
  return (
    <div>
      <BackLinkHeader to='/' />
      <Content>
        <h2 className="text-stone-600 dark:text-stone-100">Proyectos</h2>
        <MDX html={html} />
        <ProjectList />
      </Content>
    </div>
  )
}