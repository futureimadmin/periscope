import { useState } from 'react'
import { Eye, Loader2, Sparkles } from 'lucide-react'

const teams = ['Sales', 'Marketing', 'Product', 'Development']

export default function PeriscopeView() {
  const [requestingTeam, setRequestingTeam] = useState('Product')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function lookThroughPeriscope() {
    setLoading(true)
    setError(null)
    setResult(null)

    // Sample teams data — in production this comes from Firestore / internal systems
    const teamsData = {
      Sales: {
        pipeline: '$4.2M',
        top_deals: ['Acme Corp expansion', 'Globex new logo'],
        blockers: ['Missing product roadmap clarity for Q1 features'],
        sentiment: 'Optimistic but capacity-constrained',
      },
      Marketing: {
        campaigns: ['Partner co-marketing Q4', 'Product launch webinar series'],
        content_gaps: ['Need deeper technical assets from Development'],
        budget_status: 'On track',
      },
      Product: {
        roadmap_focus: ['AI insights module', 'Partner portal v2'],
        capacity: '80% allocated',
        open_requests: ['Sales requesting competitive intelligence feature'],
      },
      Development: {
        sprint_health: 'Yellow',
        tech_debt: 'Moderate',
        partner_integrations: ['Salesforce connector in progress'],
        capacity_next_sprint: 'Limited for new work',
      },
    }

    try {
      const res = await fetch('/api/insights/cross-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesting_team: requestingTeam,
          teams_data: teamsData,
          context: 'Quarterly planning cycle approaching',
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (e: any) {
      setError(e.message || 'Failed to generate Periscope view')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-charcoal-50 flex items-center gap-2">
          <Eye className="h-7 w-7 text-gold-400" />
          The Periscope
        </h2>
        <p className="mt-1 text-charcoal-300 max-w-2xl">
          One business unit looks through the Periscope and sees what is normally invisible —
          priorities, constraints and opportunities of peer teams.
        </p>
      </div>

      <div className="card max-w-xl">
        <label className="block text-sm font-medium text-charcoal-200 mb-2">
          Which team is looking?
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => setRequestingTeam(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                requestingTeam === t
                  ? 'bg-gold-400 text-charcoal-900'
                  : 'bg-charcoal-700 text-charcoal-200 hover:bg-charcoal-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={lookThroughPeriscope}
          disabled={loading}
          className="btn-primary w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Looking through the Periscope…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Periscope View
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="card border-gold-400/30">
            <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">Headline</p>
            <p className="font-display text-xl font-semibold text-charcoal-50">{result.headline}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Section title="Visibility Gaps" items={result.visibility_gaps} />
            <Section title="Key Signals" items={result.key_signals} />
            <Section title="Collaboration Opportunities" items={result.collaboration_opportunities} />
            <Section title="Recommended Questions" items={result.recommended_questions} />
          </div>

          {result.risk_of_misalignment && (
            <div className="card">
              <h3 className="font-display text-lg font-semibold text-gold-400 mb-2">
                Risk of Misalignment
              </h3>
              <p className="text-sm text-charcoal-200 leading-relaxed">{result.risk_of_misalignment}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div className="card">
      <h3 className="font-display text-lg font-semibold text-gold-400 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-charcoal-200">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
