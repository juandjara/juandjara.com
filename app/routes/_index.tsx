import Content from "@/components/Content"
import { getProjects, getSinglePost } from "@/lib/posts.server"
import { Link, useLoaderData } from "@remix-run/react"
import MDX from "@/components/MDX"
import Header from "@/components/Header"
import clsx from "clsx"

export const handle = {
  post: 'index.mdx'
}

export async function loader() {
  const post = await getSinglePost('/index.mdx')
  const projects = await getProjects()

  return {
    projects: projects.slice(0, 3),
    html: post.code
  }
}

export default function Index() {
  const { projects, html } = useLoaderData<typeof loader>()

  return (
    <>
      <Header />
      <ul className="flex flex-wrap items-stretch justify-center gap-6 mt-12">
        {projects.map((project) => (
          <li key={project.link} className={clsx(
            'w-80 rounded-xl relative',
            'bg-white dark:bg-sky-900',
            'border border-orange-500',
            'transition-shadow shadow shadow-orange-500',
            'hover:shadow-md hover:shadow-orange-400',
            'focus-within:shadow-md focus-within:shadow-orange-400'
          )}>
            <a href={project.link} className="absolute inset-0 z-10">
              <span className="sr-only">{project.title}</span>
            </a>
            <div className="h-48 bg-orange-500 rounded-t-xl">
              {project.backgroundUrl && (
                <img
                  alt="screenshot background"
                  src={project.backgroundUrl}
                  className="object-cover h-full w-full rounded-t-xl"
                />
              )}
            </div>
            {project.image && (
              <div className="relative">
                <img 
                  alt={project.title}
                  src={project.image}
                  className="object-cover p-2 rounded-xl bg-orange-200/50 w-24 h-auto mx-auto -mt-12"
                />
              </div>
            )}
            <div className="p-3">
              <p className="not-sr-only text-xl font-semibold mt-2 mb-1">{project.title}</p>
              <MDX html={project.description} />
            </div>
          </li>
        ))}
      </ul>
      <Link
        to="/projects"
        className="block text-center mt-3 text-stone-600 dark:text-stone-100 hover:underline"
      >
        Ver todos los proyectos
      </Link>
      <div className="max-w-prose mx-auto">
        <Content><MDX html={html} /></Content>
      </div>
    </>
  )
}
