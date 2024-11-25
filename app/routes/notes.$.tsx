import BackLink from "@/components/BackLink"
import Content from "@/components/Content"
import MDX from "@/components/MDX"
import NoteList from "@/components/NoteList"
import { getNoteContent, getNotesInPrefix, type StatusError } from "@/lib/notes.server"
import { redirect, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader({ params, request }: LoaderFunctionArgs) {
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
