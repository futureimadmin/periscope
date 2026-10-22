/**
 * Brand mark from public/periscope.svg.
 * Round image fills the container — no extra yellow circle behind it.
 */
export default function PeriscopeIcon({
  className = 'h-9 w-9',
  alt = 'Periscope',
}: {
  className?: string
  alt?: string
  /** @deprecated ignored */
  strokeWidth?: number
}) {
  return (
    <img
      src="/periscope.svg"
      alt={alt}
      className={`rounded-full object-cover ${className}`}
      draggable={false}
    />
  )
}
