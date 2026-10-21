/**
 * Brand mark from public/periscope.svg — use this everywhere instead of inline SVGs or Telescope.
 */
export default function PeriscopeIcon({
  className = 'h-5 w-5',
  alt = 'Periscope',
}: {
  className?: string
  alt?: string
  /** @deprecated ignored — asset is the public SVG */
  strokeWidth?: number
}) {
  return (
    <img
      src="/periscope.svg"
      alt={alt}
      className={className}
      draggable={false}
    />
  )
}
