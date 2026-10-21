/**
 * Original Periscope mark — not a telescope.
 * Classic optical periscope: vertical tube, bottom eyepiece,
 * top horizontal arm with objective lens (you do not look straight through).
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
      {/* Vertical main tube */}
      <path d="M10 20V8" />
      <path d="M14 20V8" />
      {/* Bottom eyepiece (side-looking — you do not look straight down the tube) */}
      <path d="M10 20h-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3" />
      <circle cx="6.5" cy="17.5" r="1.2" />
      {/* Top bend + horizontal arm toward objective */}
      <path d="M10 8h6" />
      <path d="M14 8h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2" />
      {/* Objective lens housing */}
      <rect x="17" y="3" width="4" height="3" rx="0.5" />
      {/* Suggest internal fold of light (not a straight optical path) */}
      <path d="M12 11v2" opacity="0.5" />
      <path d="M12 15v1" opacity="0.35" />
    </svg>
  )
}
