export default function Content({ children, padding = 'py-8 md:py-12' }: { children: React.ReactNode; padding?: string }) {
  const style = [
    'prose prose-orange prose-hr:border-gray-300 lg:prose-xl',
    'dark:prose-invert dark:prose-yellow',
    padding
  ].join(' ')

  return (
    <article className={style}>{children}</article>
  )
}