import { useEffect, useRef, useState } from 'react'

type PreviewPoint = {
  x: number
  y: number
  age: number
}

const POINT_LIFETIME = 980
const MAX_POINTS = 64
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function CursorTrailPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const pointsRef = useRef<PreviewPoint[]>([])
  const pointerRef = useRef({ active: false, lastMove: 0, x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY)

    const syncMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches)
    }

    syncMotionPreference()
    motionQuery.addEventListener('change', syncMotionPreference)

    return () => motionQuery.removeEventListener('change', syncMotionPreference)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current

    if (!canvas || !wrapper) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    const resizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio))
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const drawPoint = (
      x: number,
      y: number,
      radius: number,
      opacity: number,
    ) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius * 3)
      gradient.addColorStop(0, `rgba(186, 230, 253, ${0.92 * opacity})`)
      gradient.addColorStop(0.38, `rgba(56, 189, 248, ${0.5 * opacity})`)
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0)')

      context.beginPath()
      context.fillStyle = gradient
      context.arc(x, y, radius * 3, 0, Math.PI * 2)
      context.fill()
    }

    const drawStaticFallback = () => {
      resizeCanvas()

      const rect = wrapper.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      context.clearRect(0, 0, width, height)

      const fallbackPoints = [
        [0.68, 0.34, 12, 0.92],
        [0.58, 0.44, 10, 0.68],
        [0.48, 0.55, 8, 0.42],
        [0.38, 0.64, 6, 0.26],
      ] as const

      fallbackPoints.forEach(([x, y, radius, opacity]) => {
        drawPoint(width * x, height * y, radius, opacity)
      })
    }

    if (prefersReducedMotion) {
      drawStaticFallback()
      return undefined
    }

    const addPoint = (x: number, y: number) => {
      pointsRef.current.push({ x, y, age: 0 })

      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current.splice(0, pointsRef.current.length - MAX_POINTS)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect()
      pointerRef.current = {
        active: true,
        lastMove: performance.now(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }

    const draw = (timestamp: number) => {
      const rect = wrapper.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const delta = lastFrameTimeRef.current
        ? timestamp - lastFrameTimeRef.current
        : 16
      const pointer = pointerRef.current
      const usePointer =
        pointer.active && timestamp - pointer.lastMove < 900 && width && height

      lastFrameTimeRef.current = timestamp
      context.clearRect(0, 0, width, height)

      if (usePointer) {
        addPoint(pointer.x, pointer.y)
      } else {
        const time = timestamp * 0.001
        const x = width * 0.5 + Math.sin(time * 1.2) * width * 0.27
        const y =
          height * 0.5 + Math.sin(time * 2.4 + Math.PI / 5) * height * 0.24
        addPoint(x, y)
      }

      pointsRef.current = pointsRef.current
        .map((point) => ({ ...point, age: point.age + delta }))
        .filter((point) => point.age < POINT_LIFETIME)

      pointsRef.current.forEach((point, index, points) => {
        const life = 1 - point.age / POINT_LIFETIME
        const sequence = (index + 1) / points.length
        const radius = 2.5 + 7.5 * life * sequence
        const opacity = Math.min(1, life * (0.22 + sequence * 0.9))
        drawPoint(point.x, point.y, radius, opacity)
      })

      const head = pointsRef.current[pointsRef.current.length - 1]

      if (head) {
        drawPoint(head.x, head.y, 13, 1)
        context.beginPath()
        context.fillStyle = 'rgba(240, 249, 255, 0.95)'
        context.arc(head.x, head.y, 3.2, 0, Math.PI * 2)
        context.fill()
      }

      frameRef.current = window.requestAnimationFrame(draw)
    }

    resizeCanvas()
    lastFrameTimeRef.current = 0
    pointsRef.current = []
    wrapper.addEventListener('pointermove', handlePointerMove, { passive: true })
    wrapper.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('resize', resizeCanvas)
    frameRef.current = window.requestAnimationFrame(draw)

    return () => {
      wrapper.removeEventListener('pointermove', handlePointerMove)
      wrapper.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('resize', resizeCanvas)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [prefersReducedMotion])

  return (
    <div className="cursor-trail-preview" ref={wrapperRef}>
      <canvas aria-hidden="true" ref={canvasRef} />
      <span>Move cursor to paint</span>
    </div>
  )
}

export default CursorTrailPreview
