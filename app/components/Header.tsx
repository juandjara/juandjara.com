export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-stone-600 flex items-center">
      <img alt="site logo" src="/images/avatar.jpeg" width={50} height={50} className="rounded-full mr-3" />
      <span>{children}</span>
    </h1>
  )
}