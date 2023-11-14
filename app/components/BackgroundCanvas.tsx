import { useMatches } from "@remix-run/react"
import { useEffect, useRef } from "react"

// orange-500
const orange = (opacity = 1) => `rgb(249, 115, 22, ${opacity})`
// sky-50
const lightBg = (opacity = 1) => `rgb(240, 249, 255, ${opacity})`
// sky-800
const darkBg = (opacity = 1) => `rgb(7, 89, 133, ${opacity})`

export default function BackgroundCanvas() {
  const m = useMatches()
  const theme = m[0].data.theme as 'light' | 'dark'
  const background = theme === 'light' ? lightBg : darkBg

  const ref = useRef<HTMLCanvasElement>(null)
  const origin = useRef({ x: 0, y: 0 })
  const dest = useRef({ x: 0, y: 0 })
  const circles = useRef<{ x: number; y: number; radius: number; opacity: number }[]>([])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.globalAlpha = 0
    origin.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    dest.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    function updateCursor(e: MouseEvent) {
      origin.current = {
        x: dest.current.x,
        y: dest.current.y,
      }
      dest.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }
    document.addEventListener("mousemove", updateCursor)

    function updateCursorTouch(e: TouchEvent) {
      e.preventDefault()
      origin.current = {
        x: dest.current.x,
        y: dest.current.y,
      }
      dest.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }
    document.addEventListener("touchmove", updateCursorTouch, { passive: false })

    function onResize() {
      if (ref.current) {
        ref.current.width = window.innerWidth
        ref.current.height = window.innerHeight
      }
    }
    window.addEventListener("resize", onResize)

    function onClick(e: MouseEvent) {
      const circle = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 1,
      }
      circles.current.push(circle)
    }
    document.addEventListener("click", onClick)

    let raf: number
    function animate() {
      if (canvas && ctx) {
        ctx.fillStyle = background(0.3)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = orange(1)
        ctx.moveTo(origin.current.x, origin.current.y)
        ctx.lineTo(dest.current.x, dest.current.y)
        ctx.stroke()
        circles.current.forEach((c) => {
          ctx!.fillStyle = orange(c.opacity)
          ctx!.beginPath()
          ctx!.arc(c.x, c.y, c.radius, 0, Math.PI * 2)
          ctx!.fill()
          c.radius += 1
          c.opacity -= 0.01
        })
        circles.current = circles.current.filter((c) => c.opacity > 0)
        raf = requestAnimationFrame(animate)
      }
    }

    onResize()
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("touchmove", updateCursorTouch)
      document.removeEventListener("resize", onResize)
      document.removeEventListener("click", onClick)
    }
  }, [background])

  return (
    <canvas
      ref={ref}
      id="background-canvas"
      className="fixed -z-10 inset-0 w-full h-full pointer-events-none touch-pan-y"
    />
  )
}
