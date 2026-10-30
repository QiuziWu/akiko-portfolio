import { useEffect, useMemo, useRef } from 'react'

// Interaction distances and timing are in screen pixels and milliseconds.
const DEFAULT_INTERACTION = {
  radius: 120,
  baseColor: '#E5E5E5',
  activeColor: '#555555',
  maxScale: 1.25,
  returnDuration: 500,
}

const GRID_SPACING = 6
const DOT_RADIUS = 1.25

function rgb(hex) {
  return hex.match(/[\da-f]{2}/gi).map((channel) => Number.parseInt(channel, 16))
}

export default function InteractivePixelMap({ map, className = '', interaction }) {
  const svgRef = useRef(null)
  const settings = useMemo(
    () => ({ ...DEFAULT_INTERACTION, ...interaction }),
    [interaction],
  )
  const dots = useMemo(() => map.rows.flatMap((row, y) => (
    Array.from(row).flatMap((cell, x) => cell === 'o'
      ? [{ x: (x + 0.5) * GRID_SPACING, y: (y + 0.5) * GRID_SPACING }]
      : [])
  )), [map])
  const width = map.columns * GRID_SPACING
  const height = map.rows.length * GRID_SPACING

  useEffect(() => {
    const svg = svgRef.current
    const circles = Array.from(svg.querySelectorAll('circle'))
    const strengths = new Float32Array(dots.length)
    const base = rgb(settings.baseColor)
    const active = rgb(settings.activeColor)
    const media = window.matchMedia(
      '(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let pointer = null
    let bounds = null
    let frame = 0
    let lastTime = 0

    function paint(index, strength) {
      const channels = base.map((value, channel) => (
        Math.round(value + (active[channel] - value) * strength)
      ))
      circles[index].setAttribute('fill', `rgb(${channels.join(',')})`)
      circles[index].setAttribute('r', DOT_RADIUS * (1 + (settings.maxScale - 1) * strength))
    }

    function animate(time) {
      frame = 0
      if (!media.matches || !bounds) return

      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16
      lastTime = time
      let unsettled = false

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index]
        const dx = pointer ? bounds.left + dot.x * bounds.scaleX - pointer.x : Infinity
        const dy = pointer ? bounds.top + dot.y * bounds.scaleY - pointer.y : Infinity
        const distanceSquared = dx * dx + dy * dy
        let target = 0

        if (distanceSquared < settings.radius * settings.radius) {
          const proximity = 1 - Math.sqrt(distanceSquared) / settings.radius
          target = proximity * proximity * (3 - 2 * proximity)
        }

        const current = strengths[index]
        // Three time constants bring returning dots to within 5% in ~500ms.
        const duration = target > current ? 180 : settings.returnDuration
        const blend = 1 - Math.exp(-elapsed / (duration / 3))
        let next = current + (target - current) * blend
        if (Math.abs(target - next) < 0.002) next = target

        if (next !== current) {
          strengths[index] = next
          paint(index, next)
        }
        if (Math.abs(target - next) >= 0.002) unsettled = true
      }

      // No continuous animation loop once the dots have settled.
      if (unsettled) frame = window.requestAnimationFrame(animate)
      else lastTime = 0
    }

    function schedule() {
      if (!frame && media.matches) frame = window.requestAnimationFrame(animate)
    }

    function move(event) {
      if (!media.matches || event.pointerType !== 'mouse') return
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }

    function leave() {
      pointer = null
      schedule()
    }

    function measure() {
      // The SVG matrix also accounts for aspect-ratio letterboxing on short screens.
      const matrix = svg.getScreenCTM()
      bounds = matrix && { left: matrix.e, top: matrix.f, scaleX: matrix.a, scaleY: matrix.d }
      schedule()
    }

    function reset() {
      window.cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      pointer = null
      strengths.fill(0)
      for (const circle of circles) {
        circle.setAttribute('fill', settings.baseColor)
        circle.setAttribute('r', DOT_RADIUS)
      }
    }

    function changeMode() {
      reset()
      measure()
    }

    function visibility() {
      if (document.hidden) reset()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(svg)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    window.addEventListener('scroll', measure, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    media.addEventListener('change', changeMode)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
      window.removeEventListener('scroll', measure)
      document.removeEventListener('visibilitychange', visibility)
      media.removeEventListener('change', changeMode)
    }
  }, [dots, width, height, settings])

  return (
    <svg
      ref={svgRef}
      className={`pixel-map ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={DOT_RADIUS}
          fill={settings.baseColor}
        />
      ))}
    </svg>
  )
}
