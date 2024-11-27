import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react"
import type { ActionFunctionArgs, LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { data } from "@remix-run/node"

import "./tailwind.css"
import { getTheme, toggleTheme } from "./lib/themeCookie.server"
import GlobalSpinner from "./components/GlobalSpiner"
import Footer from "./components/Footer"
import BackgroundCanvas from "./components/BackgroundCanvas"
import ClickSoundEffects from "./components/ClickSoundEffects"

export const links: LinksFunction = () => [
  // { rel: "stylesheet", href: css },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export const meta: MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { title: "Juan D. Jara" },
    { name: "description", content: "Sitio web personal de Juan D. Jara. Redes, notas y proyectos" },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const theme = await getTheme(request)
  return theme
}

export async function action({ request }: ActionFunctionArgs) {
  const cookie = await toggleTheme(request)
  return data({ ok: true }, {
    headers: {
      'Set-Cookie': cookie
    }
  })
}

const isDEV = process.env.NODE_ENV === 'development'

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useLoaderData<typeof loader>()
  return (
    <html lang="es" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" type="image/jpeg" href="/images/avatar.jpeg" />
        <Meta />
        <Links />
      </head>
      <body className="selection:bg-sky-200 dark:selection:bg-sky-600 bg-sky-50 dark:bg-sky-800 text-stone-800 dark:text-white">
        <GlobalSpinner />
        <div className="container max-w-screen-xl mx-auto px-3 min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <BackgroundCanvas />
        <ClickSoundEffects />
        {!isDEV && (
          <script async defer data-website-id="fa333b7a-2099-491b-afb1-f410252b8a2b" src="https://uma.djara.dev/umami.js"></script>
        )}
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()

  let status = 500
  let message = ''
  let title = ''
  const isHttpError = isRouteErrorResponse(error)
  if (isHttpError) {
    status = error.status
    message = error.data?.message as string
    title = `${error.status} ${error.statusText}`
  } else {
    if (error instanceof Error) {
      message = error.message
      title = 'Uncatched Error'
    }
  }

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="h-screen flex flex-col items-center justify-center text-slate-700 text-center">
          <span className="text-xl" role='img' aria-label='Worried face'>😟</span>
          <p className="text-2xl">
            {status === 404 ? 'There is nothing here' : `I'm sorry`}
          </p>
          <div className="my-6">
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-base">{message}</p>
          </div>
          <Link to="/" className="bg-slate-700 text-white rounded-lg px-4 py-2">Take me home</Link>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
