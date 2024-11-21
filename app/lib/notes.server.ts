import type { RemixMdxConfigFunction } from "@remix-run/dev/dist/config"
import { bundleMDX } from "mdx-bundler"
import remixConfig from "remix.config"

const SB_AUTH_TOKEN = process.env.SB_AUTH_TOKEN
const BASE_URL = 'https://sb.djara.dev'

type NoteIndex = {
  size: number
  perm: 'r' | 'rw'
  created: number // ms
  lastModified: number // ms
  contentType: string
  name: string
}[]

export type Note = {
  link: string
  text: string
  isPrefix: boolean
}

export async function getPublicPrefixes() {
  const [index, data] = await Promise.all([
    request<NoteIndex>(`${BASE_URL}/index.json`),
    request<string>(`${BASE_URL}/PUBLIC.md`),
  ]) as [NoteIndex, string]
  const lines = data.split('\n').map((line) => {
    const isPrefix = index.some((item) => item.name.startsWith(`${line}/`))
    return { link: line, text: line, isPrefix }
  })
  return lines
}

async function getAllPublicNotes(
  predicate: (item: NoteIndex[number]) => boolean = () => true
) {
  const [index, data] = await Promise.all([
    request<NoteIndex>(`${BASE_URL}/index.json`),
    request<string>(`${BASE_URL}/PUBLIC.md`),
  ]) as [NoteIndex, string]

  const publicPrefixes = data.split('\n')
  return index.filter((item) => (
    item.contentType === 'text/markdown'
      && publicPrefixes.some((prefix) => item.name.startsWith(prefix))
      && predicate(item)
  ))
}

export async function getNotesInPrefix(prefix: string) {
  const publicNotes = await getAllPublicNotes((item) => item.name.startsWith(`${prefix}/`))
  return publicNotes.map((note) => {
    return {
      link: note.name.replace(/\.md$/, ''),
      text: note.name.slice(prefix.length + 1).replace(/\.md$/, ''),
      isPrefix: false
    }
  }).sort((a, b) => {
    return a.text.localeCompare(b.text)
  })
}

export async function getNoteContent(prefix: string) {
  const data = await request<string>(`${BASE_URL}/${prefix}.md`)
  const html = await parseMarkdown(data)
  return html
}

export async function request<T = unknown>(...params: Parameters<typeof fetch>) {
  if (!SB_AUTH_TOKEN) {
    throw statusError(500, 'SB_AUTH_TOKEN is not set')
  }

  params[1] = params[1] || {}
  params[1].headers = new Headers(params[1].headers || {})
  params[1].headers.set('X-Sync-Mode', 'false')
  params[1].headers.set('Authorization', `Bearer ${SB_AUTH_TOKEN}`)
  const res = await fetch(...params)
  if (!res.ok) {
    throw statusError(res.status, `Network response not ok for url ${params[0]}: ${res.status} ${res.statusText} \n${await res.text()}`)
  }
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const json = await res.json()
    return json as T
  }
  return res.text()
}

export type StatusError = Error & { status: number }

export function statusError(status: number, message: string) {
  const e = new Error(message)
  ;(e as StatusError).status = status
  return e as StatusError
}

async function parseMarkdown(text: string) {
  const mdxPlugins = await (remixConfig.mdx as RemixMdxConfigFunction)('')  
  const result = await bundleMDX({
    source: text,
    mdxOptions (options) {
      options.remarkPlugins = (options.remarkPlugins ?? []).concat(mdxPlugins?.remarkPlugins || [])
      options.rehypePlugins = (options.rehypePlugins ?? []).concat(mdxPlugins?.rehypePlugins || [])
      return options
    }
  })
  return result.code
}
