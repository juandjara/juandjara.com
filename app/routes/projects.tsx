import ProjectList from "@/components/projects/ProjectList"
import css from '@/components/projects/projects.css'
import { Link } from "@remix-run/react"

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
    <div className="max-w-prose px-3 py-10">
      <Link
        to="/"
        className="text-sm font-medium uppercase no-underline hover:underline mb-6 block"
      >
        Back
      </Link>
      <h2 className="mb-6 mt-12 text-4xl font-bold text-stone-600">Proyectos</h2>
      <p>
        Estos son mis proyectos. Algunos de ellos, como Guardianes del Rol, intentan cubrir una necesidad real de una comunidad, pero gran parte los uso como excusa para experimentar con nuevas tecnologías. Es mi forma preferida de aprender algo en ese sentido.
      </p>
      <ProjectList />
    </div>
  )
}