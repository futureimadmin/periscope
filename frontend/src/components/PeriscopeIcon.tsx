/**
 * Original Periscope mark — not a telescope.
 * Vertical tube, side eyepiece (no overlap on shaft), top arm + objective.
 * You do not look straight through.
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
      {/* Continuous vertical shaft — uninterrupted */}
      <path d="M11 4v16" />
      <path d="M15 4v16" />

      {/* Bottom base / stand */}
      <path d="M9 20h8" />

      {/* Side eyepiece — fully to the left of the shaft, connected by a short stem only */}
      <path d="M11 16H7" />
      <circle cx="5" cy="16" r="2" />

      {/* Top horizontal arm to the right */}
      <path d="M15 6h4" />
      {/* Objective lens at end of arm */}
      <circle cx="20.5" cy="6" r="2" />
    </svg>
  )
}
