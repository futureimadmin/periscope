/**
 * Periscope mark (not a telescope).
 * Vertical shaft is continuous. Side eyepiece sits fully clear of the shaft,
 * connected only by a short stem. Top arm + objective lens on the right.
 */
export default function PeriscopeIcon({
  className = 'h-5 w-5',
  strokeWidth = 2,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Vertical shaft — continuous, no cutouts */}
      <path d="M10 5v15" />
      <path d="M14 5v15" />
      <path d="M10 20h4" />

      {/* Stem + eyepiece: stem ends at x=10; circle is entirely left of x=7 */}
      <path d="M10 15H7" />
      <circle cx="4.5" cy="15" r="2" />

      {/* Top arm to the right */}
      <path d="M14 6h4.5" />
      <circle cx="20.5" cy="6" r="2" />
    </svg>
  )
}
