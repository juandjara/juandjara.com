import fs from 'fs/promises'
import { extname } from 'path'
import frontMatter from 'front-matter'

type PostMeta = {
  title: string
  date: string
  tag: string
}

/**
 * import all posts under a certain filesystem path
 * @param path filesystem path relative to /app/routes
 * @returns any[]
 */
export async function getPosts(path: string) {
  const basepath = `${__dirname}/../app/routes/${path.replace(/^\//, '').replace(/\/$/, '')}`
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
