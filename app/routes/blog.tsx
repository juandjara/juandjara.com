import { Outlet } from "@remix-run/react"

export default function Posts() {
  return (
    <div className='prose'>
      <Outlet />
    </div>
  )
}
