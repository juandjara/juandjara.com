import { Link, Outlet, useLocation } from "@remix-run/react"

export default function Posts() {
  const { pathname } = useLocation()
  const link = pathname === '/blog' ? '/' : '/blog'

  return (
    <div className='prose lg:prose-xl py-10'>
      <Link
        to={link}
        className="text-sm font-medium uppercase no-underline hover:underline"
      >
        Back
      </Link>
      <Outlet />
    </div>
  )
}
