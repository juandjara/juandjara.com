import Content from "@/components/Content"
import DarkModeToggle from "@/components/DarkModeToggle"
import { getSinglePost } from "@/lib/posts.server"
import { useLoaderData } from "@remix-run/react"
import { NavLink } from "react-router-dom"
import MDX from "@/components/MDX"

const navLinkCN = ({ isActive }: { isActive: boolean }) => isActive
  ? 'dark:text-stone-300 text-stone-400 cursor-auto'
  : 'dark:text-stone-100 text-stone-600 underline'

export async function loader() {
  const post = await getSinglePost('/index.md')
  return { html: post.code }
}

export default function Index() {
  const { html } = useLoaderData()

  return (
    <div>
      <div className="flex items-center mt-12">
        <img alt="site logo" src="/images/avatar.jpeg" width={60} height={60} className="rounded-full mr-4" />
        <h2 className="text-4xl font-bold text-stone-600 dark:text-stone-100">Juan D. Jara</h2>
      </div>
      <nav className="flex items-center justify-end space-x-4 pt-12">
        <NavLink className={navLinkCN} to="/projects">Proyectos</NavLink>
        <NavLink className={navLinkCN} to="/blog">Blog</NavLink>
        <NavLink className={navLinkCN} to="/">Sobre m&iacute;</NavLink>
        <DarkModeToggle /> 
      </nav>
      <Content><MDX html={html} /></Content>
    </div>
  )
}
