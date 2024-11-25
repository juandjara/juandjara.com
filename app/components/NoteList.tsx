import type { Note } from "@/lib/notes.server"
import { Link } from "@remix-run/react"

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul>
      {notes.map(({ text, link, isPrefix }) => (
        <li key={text}>
          <Link to={`/notes/${link}?isPrefix=${isPrefix}`}>{text}</Link>
        </li>
      ))}
    </ul>
  )
}
