import BackLink from "@/components/BackLink"
import Content from "@/components/Content"
import DarkModeToggle from "@/components/DarkModeToggle"
import MDX from "@/components/MDX"
import NoteList from "@/components/NoteList"
import { getNoteContent, getNotesInPrefix, type StatusError } from "@/lib/notes.server"
import { redirect, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader({ params, request }: LoaderArgs) {
  const slug = params['*']
  if (!slug) {
    throw new Error('No slug provided')
  }

  const isPrefix = new URL(request.url).searchParams.get('isPrefix') === 'true'

  if (isPrefix) {
    const notes = await getNotesInPrefix(slug)
    return { isPrefix: true as const, notes, slug }
  } else {
    try {
      const html = await getNoteContent(slug)
      return { isPrefix: false as const, html, slug }
    } catch (err) {
      if ((err as StatusError).status === 404) {
        throw redirect('/notes')
      } else {
        throw err
      }
    }
  }
}

export default function NoteDetail() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>
  const lastSlugPart = data.slug.split('/').slice(-1)[0]
  const backSlug = data.slug.replace(`/${lastSlugPart}`, '')

  return (
    <div>
      <header className="flex items-center mt-12 relative">
        <div>
          <h2 className="text-4xl mb-1 font-bold text-stone-600 dark:text-stone-100">Notas</h2>
          <p className="text-2xl font-medium text-stone-400 dark:text-stone-300">{data.slug}</p>
        </div>
        <div className="absolute top-1 -right-2">
          <DarkModeToggle /> 
        </div>
      </header>
      <div className="mt-6">
        <BackLink to={data.isPrefix ? '/notes' : `/notes/${backSlug}?isPrefix=true`} />
      </div>
      <Content>
        {data.isPrefix ? (
          <NoteList notes={data.notes} />
        ) : (
          <MDX html={data.html} />
        )}
      </Content>
    </div>
  )
}
