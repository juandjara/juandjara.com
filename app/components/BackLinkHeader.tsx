import BackLink from "./BackLink"
import DarkModeToggle from "./DarkModeToggle"

export default function BackLinkHeader({ to }: { to: string }) {
  return (
    <nav className="flex items-center mt-6">
      <BackLink to={to} />
      <span className="flex-grow"></span>
      <DarkModeToggle />
    </nav>
  )
}