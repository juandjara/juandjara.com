import BackLink from "@/components/BackLink"
import BackLinkHeader from "@/components/BackLinkHeader"
import Content from "@/components/Content"
import ProjectList from "@/components/projects/ProjectList"
import css from '@/components/projects/projects.css'

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}

export const meta = {
  title: 'Juan D. Jara — Proyectos'
}

export default function Projects() {
  return (
    <div>
      <BackLinkHeader to='/' />
      <Content>
        <h2 className="text-stone-600 dark:text-stone-100">Proyectos</h2>
        <p>
          Estos son mis proyectos. Algunos de ellos, como Guardianes del Rol, intentan cubrir una necesidad real de una comunidad, pero gran parte los uso como excusa para experimentar con nuevas tecnologías. Es mi forma preferida de aprender algo en ese sentido.
        </p>
        <ProjectList />
      </Content>
    </div>
  )
}