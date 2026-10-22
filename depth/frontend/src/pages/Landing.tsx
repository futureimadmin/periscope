import { Link } from 'react-router-dom'
import PeriscopeIcon from '../components/PeriscopeIcon'

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-8">
      <PeriscopeIcon className="h-16 w-16 text-gold-500" />
      <h1 className="mt-4 font-display text-3xl font-bold text-charcoal-900">Periscope Depth</h1>
      <p className="mt-2 max-w-md text-center text-charcoal-600">
        Framework Builder — per-BU steps, hooks, and published visibility for Surface.
      </p>
      <Link to="/app" className="btn-primary mt-6">
        Open Framework Builder
      </Link>
    </div>
  )
}
