import { useMatches } from "@remix-run/react"

const REPO = 'juandjara/juandjara.com'

export default function Footer() {
  const matches = useMatches()
  const editHandle = matches.find((m) => m.handle)
  const editPath = editHandle && `/content/${editHandle.handle?.post}`
  const editUrl = editPath && `https://pressunto.fly.dev/edit?repo=${REPO}&file=${editPath}`

  return (
    <footer className="my-12 text-sm">
      <p className="flex-grow">Desarrollado con <span role="img" aria-label="red heart">❤️</span> por Juan D. Jara en 2022</p>
      {editUrl && (
        <a
          className="block mt-1 underline"
          href={editUrl}
        >
          Edit
        </a>
      )}
    </footer>
  ) 
}
