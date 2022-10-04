import projects from './projects.json'

export default function ProjectList() {
  return (
    <div className='not-prose'>
      {projects.map((project, index) => (
        <div key={project.link}
          className="appear text-center md:text-left my-12 flex flex-col md:flex-row items-center bg-black/5 rounded-lg p-4" 
          style={{
            animationDelay: `${index / projects.length}s`
          }}>
          <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
            <img loading='lazy' width={80} height={80} src={project.image} alt="" />
          </div>
          <div className="flex-grow">
            <a className="block text-2xl font-medium no-underline mb-1 text-stone-500" href={project.link}>{project.title}</a>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}