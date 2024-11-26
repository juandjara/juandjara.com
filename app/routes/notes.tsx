import Content from "@/components/Content"
import DarkModeToggle from "@/components/DarkModeToggle"
import NoteList from "@/components/NoteList"
import { getPublicPrefixes } from "@/lib/notes.server"
import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, useOutlet } from "@remix-run/react"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const notes = await getPublicPrefixes()
  return { notes, slug: params['*'] }
}

export default function Notes() {
  const { notes, slug } = useLoaderData<typeof loader>()
  const children = useOutlet()

  return (
    <div>
      <header className="flex items-center mt-12 relative">
        <div>
          <h2 className="text-4xl mb-1 font-bold text-stone-600 dark:text-stone-100">Notas</h2>
          <p className="text-2xl font-medium text-stone-400 dark:text-stone-300">
            {slug || 'Índice'}
          </p>
        </div>
        <div className="absolute top-1 -right-2">
          <DarkModeToggle /> 
        </div>
      </header>
      {children ? children : (
        <Content>
          <NoteList notes={notes} />
        </Content>
      )}
    </div>
  )
}
