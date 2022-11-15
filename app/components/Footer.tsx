export default function Footer() {
  return (
    <footer className="my-12 flex text-sm items-center">
      <p>Desarrollado con <span role="img" aria-label="red heart">❤️</span> por Juan D. Jara en 2022</p>
      <div className="flex-grow"></div>
      <a className="ml-3 underline" href="https://pressunto.fly.dev/projects/juandjara/remix-blog">Edit</a>
      <a className="ml-3 underline" href="/feed.xml">RSS</a>
    </footer>
  ) 
}
