import type { Note } from "@/lib/notes.server"

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul>
      {notes.map(({ text, link, isPrefix }) => (
        <li key={text}>
          <a href={`/notes/${link}?isPrefix=${isPrefix}`}>{text}</a>
        </li>
      ))}
    </ul>
  )
}