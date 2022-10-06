import type { Project } from '@/lib/posts.server'
import MDX from '../MDX'

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className='not-prose'>
      {projects.map((project, index) => (
        <div key={project.link}
          className="appear my-8 bg-black/5 rounded-lg p-4" 
          style={{
            animationDelay: `${index / projects.length}s`
          }}>
          <div className="flex gap-3 items-center mb-2">
            <img className='flex-shrink-0' loading='lazy' width={40} height={40} src={project.image} alt="project icon" />
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