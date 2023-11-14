export default function Content({ children, padding = 'py-8 md:py-12' }: { children: React.ReactNode; padding?: string }) {
  const style = [
    'prose prose-orange prose-hr:border-gray-300 lg:prose-xl',
    'prose-li:dark:marker:text-white',
    'dark:prose-invert',
    padding
  ].join(' ')

  return (
    <article className={style}>{children}</article>
  )
}