import Content from "@/components/Content"
import DarkModeToggle from "@/components/DarkModeToggle"
import MDX from "@/components/MDX"
import ProjectList from "@/components/projects/ProjectList"
import css from '@/components/projects/projects.css'
import { getProjects, getSinglePost } from "@/lib/posts.server"
import { NavLink, useLoaderData } from "@remix-run/react"

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

const navLinkCN = ({ isActive }: { isActive: boolean }) => isActive
  ? 'dark:text-stone-300 text-stone-400 cursor-auto'
  : 'dark:text-stone-100 text-stone-600 underline'

export default function Projects() {
  const { html, projects } = useLoaderData()
  return (
    <div>
      <div className="flex items-center mt-12">
        <img alt="site logo" src="/images/avatar.jpeg" width={80} height={80} className="rounded-full mr-4" />
        <div>
          <h2 className="text-4xl mb-1 font-bold text-stone-600 dark:text-stone-100">Juan D. Jara</h2>
          <p className="text-2xl font-medium text-stone-400 dark:text-stone-300">Web Developer</p>
        </div>
      </div>
      <nav className="flex items-center justify-end space-x-4 pt-12">
        <NavLink className={navLinkCN} to="/projects">Proyectos</NavLink>
        <NavLink className={navLinkCN} to="/">Sobre m&iacute;</NavLink>
        <DarkModeToggle /> 
      </nav>
      <Content>
        <MDX html={html} />
        <ProjectList projects={projects} />
      </Content>
    </div>
  )
}