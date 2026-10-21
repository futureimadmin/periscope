import { Handshake, ExternalLink, Plus } from 'lucide-react'

const samplePartnerships = [
  {
    id: '1',
    name: 'Acme Corp Strategic Alliance',
    type: 'External',
    teams: ['Sales', 'Product', 'Marketing'],
    health: 92,
    status: 'Active',
    lastReview: '2026-10-12',
  },
  {
    id: '2',
    name: 'Cross-Functional Growth Pod',
    type: 'Internal',
    teams: ['Sales', 'Marketing', 'Product', 'Development'],
    health: 87,
    status: 'Active',
    lastReview: '2026-10-18',
  },
  {
    id: '3',
    name: 'Cloud Integrator Partner Program',
    type: 'External',
    teams: ['Product', 'Development'],
    health: 54,
    status: 'At Risk',
    lastReview: '2026-09-28',
  },
  {
    id: '4',
    name: 'Northbeam Data Alliance',
    type: 'External',
    teams: ['Sales', 'Product'],
    health: 88,
    status: 'Active',
    lastReview: '2026-10-05',
  },
]

function healthBadge(score: number) {
  if (score >= 80) return 'bg-gold-100 text-gold-800'
  if (score >= 60) return 'bg-amber-50 text-amber-800'
  return 'bg-rose-50 text-rose-700'
}

function statusBadge(status: string) {
  if (status === 'Active') return 'bg-emerald-50 text-emerald-700'
  return 'bg-rose-50 text-rose-700'
}

export default function Partnerships() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal-900 flex items-center gap-2">
            <Handshake className="h-6 w-6 text-gold-500" />
            Partnerships
          </h1>
          <p className="mt-1 text-charcoal-500">
            Formalized and emerging partnerships across business units and external partners.
          </p>
        </div>
        <button className="btn-primary">
          <Plus className="h-4 w-4" />
          New Partnership
        </button>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="min-w-full divide-y divide-charcoal-100">
          <thead className="bg-cream-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Type
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Teams
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Health
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Last Review
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-50 bg-white">
            {samplePartnerships.map((p) => (
              <tr key={p.id} className="hover:bg-cream-50 transition">
                <td className="px-5 py-4 text-sm font-medium text-charcoal-900">{p.name}</td>
                <td className="px-5 py-4 text-sm text-charcoal-600">{p.type}</td>
                <td className="px-5 py-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {p.teams.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-charcoal-100 px-2 py-0.5 text-xs text-charcoal-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${healthBadge(p.health)}`}>
                    {p.health}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-charcoal-500">{p.lastReview}</td>
                <td className="px-5 py-4 text-right">
                  <button className="text-gold-700 hover:text-gold-800">
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
