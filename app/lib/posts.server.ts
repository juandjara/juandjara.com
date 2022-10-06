import fs from 'fs/promises'
import { extname } from 'path'
import frontMatter from 'front-matter'
import {bundleMDX} from 'mdx-bundler'
import remixConfig from '../../remix.config'
import type { RemixMdxConfig, RemixMdxConfigFunction } from '@remix-run/dev/dist/config'

type PostMeta = {
  title: string
  date: string
  tag: string
}

export type PostListItem = PostMeta & {
  slug: string
  body?: string
}

export async function getPosts() {
  const basepath = `${process.cwd()}/app/routes/blog`
  const directory = await fs.readdir(basepath)

  const posts = await Promise.all(directory
    .filter(file => {
      const extension = extname(file)
      return extension === '.mdx' || extension === '.md'
    })
    .map(async (file) => {
      const filepath = `${basepath}/${file}`
      const filetext = await fs.readFile(filepath)

      const data = frontMatter<PostMeta>(filetext.toString())
      return {
        slug: file.replace(/\.mdx?$/, ''),
        ...data.attributes
      }
    }))

  return posts.sort((a, b) => {
    const aMS = new Date(a.date).getTime() || Date.now()
    const bMS = new Date(b.date).getTime() || Date.now()

    return bMS - aMS
  })
}

export type Project = {
  title: string
  image: string
  link: string
  order: number
  description: string
}

export async function getProjects() {
  const basepath = `${process.cwd()}/app/routes/projects`
  const directory = await fs.readdir(basepath)

  const posts = await Promise.all(directory
    .filter(file => {
      const extension = extname(file)
      return extension === '.md'
    })
    .map(async (file) => {
      const post = await getSinglePost(`/projects/${file}`)
      return {
        description: post.code,
        ...post.frontmatter
      } as Project
    }))

  return posts.sort((a, b) => {
    return a.order - b.order
  })
}


export async function getSinglePost(slug: string) {
  const path = `${process.cwd()}/app/routes/${slug.replace(/^\//, '').replace(/\/$/, '')}`
  const text = await fs.readFile(path)
  const config = await (remixConfig.mdx as RemixMdxConfigFunction)(path) as RemixMdxConfig
  const result = await bundleMDX({
    source: text.toString(),
    mdxOptions (options) {
      options.remarkPlugins = (options.remarkPlugins ?? []).concat(config.remarkPlugins as any[])
      options.rehypePlugins = (options.rehypePlugins ?? []).concat(config.rehypePlugins as any[])
  
      return options
    }
  })

  return result
}
