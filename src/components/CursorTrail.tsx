import { useEffect, useRef, useState } from 'react'

type TrailPoint = {
  x: number
  y: number
  age: number
}

export type TrailColorMode = 'blue' | 'white'

type CursorTrailProps = {
  colorMode: TrailColorMode
  isEnabled: boolean
  onSupportChange: (isSupported: boolean) => void
}

const MAX_POINTS = 18
const POINT_LIFETIME = 420
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

const TRAIL_COLORS: Record<
  TrailColorMode,
  { head: string; mid: string; tail: string }
> = {
  blue: {
    head: 'rgba(125, 211, 252,',
    mid: 'rgba(56, 189, 248,',
    tail: 'rgba(14, 165, 233, 0)',
  },
  white: {
    head: 'rgba(255, 255, 255,',
    mid: 'rgba(226, 232, 240,',
    tail: 'rgba(148, 163, 184, 0)',
  },
}

function CursorTrail({
  colorMode,
  isEnabled,
  onSupportChange,
}: CursorTrailProps) {
  const [isSupported, setIsSupported] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointsRef = useRef<TrailPoint[]>([])
  const frameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef(0)

  useEffect(() => {
    const finePointer = window.matchMedia(FINE_POINTER_QUERY)
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)

    const syncSupport = () => {
      const nextIsSupported = finePointer.matches && !reducedMotion.matches
      setIsSupported(nextIsSupported)
      onSupportChange(nextIsSupported)
    }

    syncSupport()
    finePointer.addEventListener('change', syncSupport)
    reducedMotion.addEventListener('change', syncSupport)

    return () => {
      finePointer.removeEventListener('change', syncSupport)
      reducedMotion.removeEventListener('change', syncSupport)
    }
  }, [onSupportChange])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas || !isEnabled || !isSupported) {
      pointsRef.current = []

      if (canvas) {
        const context = canvas.getContext('2d')
        context?.clearRect(0, 0, canvas.width, canvas.height)
      }

      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * pixelRatio)
      canvas.height = Math.floor(window.innerHeight * pixelRatio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const addPoint = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return
      }

      pointsRef.current.push({
        x: event.clientX,
        y: event.clientY,
        age: 0,
      })

      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current.splice(0, pointsRef.current.length - MAX_POINTS)
      }
    }

    const draw = (timestamp: number) => {
      const delta = lastFrameTimeRef.current
        ? timestamp - lastFrameTimeRef.current
        : 16
      lastFrameTimeRef.current = timestamp

      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      pointsRef.current = pointsRef.current
        .map((point) => ({ ...point, age: point.age + delta }))
        .filter((point) => point.age < POINT_LIFETIME)

      pointsRef.current.forEach((point, index, points) => {
        const colors = TRAIL_COLORS[colorMode]
        const life = 1 - point.age / POINT_LIFETIME
        const sequence = (index + 1) / points.length
        const radius = 4 + sequence * 9 * life
        const opacity = life * sequence
        const gradient = context.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius * 3,
        )

        gradient.addColorStop(0, `${colors.head} ${0.82 * opacity})`)
        gradient.addColorStop(0.35, `${colors.mid} ${0.46 * opacity})`)
        gradient.addColorStop(1, colors.tail)

        context.beginPath()
        context.fillStyle = gradient
        context.arc(point.x, point.y, radius * 3, 0, Math.PI * 2)
        context.fill()
      })

      frameRef.current = window.requestAnimationFrame(draw)
    }

    resizeCanvas()
    lastFrameTimeRef.current = 0
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('pointermove', addPoint, { passive: true })
    frameRef.current = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', addPoint)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      pointsRef.current = []
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }, [colorMode, isEnabled, isSupported])

  if (!isSupported || !isEnabled) {
    return null
  }

  return (
    <canvas
      aria-hidden="true"
      className="cursor-trail-canvas"
      ref={canvasRef}
    />
  )
}

export default CursorTrail
