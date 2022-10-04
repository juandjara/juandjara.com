import Content from "@/components/Content"
import DarkModeToggle from "@/components/DarkModeToggle"
import { NavLink } from "react-router-dom"

const navLinkCN = ({ isActive }: { isActive: boolean }) => isActive
  ? 'text-stone-400 cursor-auto'
  : 'text-stone-600 underline'

export default function Index() {
  return (
    <div>
      <div className="flex items-center mt-12">
        <img alt="site logo" src="/images/avatar.jpeg" width={60} height={60} className="rounded-full mr-4" />
        <h2 className="text-4xl font-bold text-stone-600">Juan D. Jara</h2>
      </div>
      <nav className="flex items-center justify-end space-x-4 pt-12">
        <NavLink className={navLinkCN} to="/projects">Proyectos</NavLink>
        <NavLink className={navLinkCN} to="/blog">Blog</NavLink>
        <NavLink className={navLinkCN} to="/">Sobre m&iacute;</NavLink>
        <DarkModeToggle /> 
      </nav>
      <Content>
        <p>
          Hola. Soy Juan, desarrollador web de Sevilla, con experiencia en tecnologias GIS. Me gusta construir proyectos que tengan diseños gráficos cuidados, altas cantidades de interactividad y experiencias que mezclen el arte con la tecnologia. 
        </p>
        <p>
          He contribuido a varios proyectos open source p&uacute;blicos
          {" "}<span role="img" aria-label="apreton de manos">🤝</span>
        </p>
        <ul>
          <li>
            <a href="https://github.com/visgl/deck.gl/pulls?q=is%3Apr+author%3Ajuandjara">deck.gl</a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/react-static-plugin-md">React Static</a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/quill-blot-formatter-mobile">quill.js</a>
          </li>
          <li>
            <a href="https://github.com/prose/prose/pull/1129">prose.io</a>
          </li>
        </ul>
        <p>
          Y he participado en varias Game Jams y hackatons
          {" "}<span role="img" aria-label="space invaders alien monster">👾</span>
        </p>
        <ul>
          <li>
            <a href="https://github.com/juandjara/familiarGJ6">Familiar Game Jam 6 (2016)</a>
          </li>
          <li>
            <a href="https://github.com/juandjara/familiargamejam8">Familiar Game Jam 8 (2017)</a>
          </li>
          <li>
            <a href="https://github.com/juandjara/todasjamers">
              TodasJammers
            </a> (evento online de <a href="https://todasgammers.com">todasgammers</a> de 2017)
          </li>
          <li>
            <a href="https://github.com/juandjara/global-game-jam-2018">Global Game Jame 2018</a>
          </li>
        </ul>
        <p>
          En <a href="/projects">esta página (Proyectos)</a> voy publicando enlaces a los proyectos que empiezo, publico y a veces termino
        </p>
        <p>
          Y <a href="/blog">esta (Blog)</a> la tengo con la intenci&oacute;n de acostumbrarme a escribir mas a menudo palabras en mi idioma.
        </p>
        <p>
          Puedes usar los enlaces de aqu&iacute; abajo para contactar conmigo
          {" "}<span role="img" aria-label="mano apuntando hacia abajo">👇</span>
        </p>
        <hr className="border-gray-300" />
        <a href="https://twitter.com/_juandjara">Twitter</a>
        {' · '}<a href="https://github.com/juandjara">GitHub</a>
        {' · '}<a href="https://instagram.com/_juandjara">Instagram</a>
        {' · '}<a href="juanorigami@gmail.com">Email</a>
      </Content>
    </div>
  )
}
