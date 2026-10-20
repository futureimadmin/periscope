import { Handshake, ExternalLink } from 'lucide-react'

const samplePartnerships = [
  {
    id: '1',
    name: 'Acme Corp Strategic Alliance',
    type: 'External',
    teams: ['Sales', 'Product'],
    health: 82,
    status: 'healthy',
    lastReview: '2026-09-12',
  },
  {
    id: '2',
    name: 'Cross-Functional Growth Pod',
    type: 'Internal',
    teams: ['Sales', 'Marketing', 'Product', 'Development'],
    health: 71,
    status: 'healthy',
    lastReview: '2026-10-01',
  },
  {
    id: '3',
    name: 'Cloud Integrator Partner Program',
    type: 'External',
    teams: ['Product', 'Development'],
    health: 54,
    status: 'at_risk',
    lastReview: '2026-08-28',
  },
]

function healthColor(score: number) {
  if (score >= 75) return 'text-emerald-400'
  if (score >= 55) return 'text-amber-400'
  return 'text-rose-400'
}

export default function Partnerships() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-charcoal-50 flex items-center gap-2">
            <Handshake className="h-7 w-7 text-gold-400" />
            Partnerships
          </h2>
          <p className="mt-1 text-charcoal-300">
            Formalized and emerging partnerships across business units and external partners.
          </p>
        </div>
        <button className="btn-primary">+ New Partnership</button>
      </div>

      <div className="overflow-hidden rounded-xl border border-charcoal-700">
        <table className="min-w-full divide-y divide-charcoal-700">
          <thead className="bg-charcoal-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal-300">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal-300">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal-300">
                Teams
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal-300">
                Health
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-charcoal-300">
                Last Review
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-800 bg-charcoal-900/50">
            {samplePartnerships.map((p) => (
              <tr key={p.id} className="hover:bg-charcoal-800/50 transition">
                <td className="px-4 py-4 text-sm font-medium text-charcoal-50">{p.name}</td>
                <td className="px-4 py-4 text-sm text-charcoal-300">{p.type}</td>
                <td className="px-4 py-4 text-sm text-charcoal-300">
                  <div className="flex flex-wrap gap-1">
                    {p.teams.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-charcoal-700 px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={`px-4 py-4 text-sm font-semibold ${healthColor(p.health)}`}>
                  {p.health}
                </td>
                <td className="px-4 py-4 text-sm text-charcoal-400">{p.lastReview}</td>
                <td className="px-4 py-4 text-right">
                  <button className="text-gold-400 hover:text-gold-300">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
