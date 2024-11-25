import click1 from '@/assets/click-1-pebbles.wav'
import click2 from '@/assets/click-2-plastic-bubble.wav'
import click3 from '@/assets/click-3-old-camera.wav'
import click4 from '@/assets/click-4-arcade.wav'
import { useEffect } from 'react'

const SOUNDS = [click1, click2, click3, click4]

export default function ClickSoundEffects() {
  useEffect(() => {
    const fn = () => {
      const audio = new Audio(SOUNDS[Math.floor(Math.random() * SOUNDS.length)])
      audio.volume = 0.15
      audio.play()
    }
    document.addEventListener('click', fn)
    return () => document.removeEventListener('click', fn)
  }, [])

  return null
}
