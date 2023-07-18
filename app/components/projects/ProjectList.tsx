import type { Project } from '@/lib/posts.server'
import MDX from '../MDX'

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className='not-prose mt-12'>
      {projects.map((project, index) => (
        <div key={project.link}
          className="appear my-4 mx-1 rounded-md p-4 bg-gradient-to-r from-blue-200/20 to-cyan-500/20"
          style={{
            animationDelay: `${index / projects.length}s`
          }}>
          <div className="flex gap-4 items-center mb-4">
            <img className='flex-shrink-0' loading='lazy' width={40} height={40} src={project.image} alt="" />
            <a 
              href={project.link}
              className="flex-grow no-underline font-medium text-2xl text-orange-600 dark:text-yellow-600"
            >
              {project.title}
            </a>
            <span className='text-sm flex-shrink-0'>{project.status}</span>
          </div>
          <MDX html={project.description} />
        </div>
      ))}
    </div>
  )
}