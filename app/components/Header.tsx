import DarkModeToggle from "./DarkModeToggle"

export default function Header() {
  return (
    <header className="flex items-center mt-12 relative">
      <img alt="site logo" src="/images/avatar.jpeg" width={80} height={80} className="rounded-full mr-4" />
      <div>
        <h2 className="text-4xl mb-1 font-bold text-stone-600 dark:text-stone-100">Juan D. Jara</h2>
        <p className="text-2xl font-medium text-stone-400 dark:text-stone-300">Web Developer</p>
      </div>
      <div className="absolute top-1 -right-2">
        <DarkModeToggle /> 
      </div>
    </header>
  ) 
}
