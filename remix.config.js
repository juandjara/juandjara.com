/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  mdx: async (filename) => {
    const [ariaEmojis, emojis, gfm, images] = await Promise.all([
      import("rehype-accessible-emojis").then((mod) => mod.rehypeAccessibleEmojis),
      import('remark-gfm').then(mod => mod.default),
      import('remark-emoji').then(mod => mod.default),
      import('remark-images').then(mod => mod.default),
    ])
  
    return {
      rehypePlugins: [ariaEmojis],
      remarkPlugins: [
        gfm,
        emojis,
        images,
      ],
    }
  },
  serverDependenciesToBundle: [
    /remark-.*/,
    /rehype-.*/,
    /micromark-.*/,
    /mdast-.*/,
    /unist-.*/,
    /mdx-bundler.*/,
    'fault',
    'emoticon',
    'ccount',
    'decode-named-character-reference',
    'character-entities',
    'markdown-table'
  ],
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
}