import { useState } from 'react'
import {
  Eye,
  ArrowRight,
  Sparkles,
  Loader2,
  Building2,
  Users,
} from 'lucide-react'

const teams = ['Sales', 'Marketing', 'Product', 'Development'] as const

const lookingIntoOptions = [
  { id: 'partner-data', label: 'Partner data', desc: 'Partner health, engagement, CSAT, pipeline contribution' },
  { id: 'sales', label: 'Sales data', desc: 'Pipeline, deals, blockers, capacity signals' },
  { id: 'marketing', label: 'Marketing data', desc: 'Campaigns, content gaps, demand signals' },
  { id: 'product', label: 'Product data', desc: 'Roadmap, capacity, open requests' },
  { id: 'development', label: 'Development data', desc: 'Sprint health, integrations, tech debt' },
]

const sampleVisibility: Record<string, { headline: string; signals: string[]; gaps: string[] }> = {
  'partner-data': {
    headline: 'Partner signals that are normally locked in partner systems and account teams.',
    signals: [
      'Acme Corp CSAT dipped 8 pts after last integration delay',
      'Northbeam increased joint pipeline 23% QoQ',
      '3 partners flagged low engagement but high strategic fit',
    ],
    gaps: [
      'No shared view of partner success plans across Sales and Product',
      'Partner roadmap commitments not visible to Development',
    ],
  },
  sales: {
    headline: 'Sales pipeline and constraints that other units rarely see in full.',
    signals: [
      'Top deals blocked on missing Product roadmap clarity',
      '$4.2M pipeline with capacity constraints in Q4',
      'Competitive intelligence requests stacking up',
    ],
    gaps: [
      'Product cannot see early intent signals from open deals',
      'Marketing cannot see which partners drive pipeline',
    ],
  },
  marketing: {
    headline: 'Campaign and demand data that sits outside other teams\' day-to-day view.',
    signals: [
      'Partner co-marketing Q4 needs technical assets from Development',
      'Webinar series driving mid-market interest',
      'Budget on track; content gaps on integrations',
    ],
    gaps: [
      'Sales cannot see campaign attribution by partner',
      'Product cannot see demand themes from campaigns',
    ],
  },
  product: {
    headline: 'Roadmap and capacity signals that Sales and Marketing usually lack.',
    signals: [
      'AI insights module and Partner portal v2 in focus',
      '80% capacity already allocated',
      'Open request: competitive intelligence feature from Sales',
    ],
    gaps: [
      'Sales cannot see which features land this quarter',
      'Development capacity not reflected in partner commitments',
    ],
  },
  development: {
    headline: 'Engineering reality that partner and GTM teams cannot see otherwise.',
    signals: [
      'Sprint health: Yellow; limited room for new work',
      'Salesforce connector in progress',
      'Tech debt moderate; partner integrations competing for slots',
    ],
    gaps: [
      'Partner SLAs set without visibility into sprint load',
      'Marketing launch dates not aligned to integration readiness',
    ],
  },
}

export default function PeriscopeView() {
  const [lookingFrom, setLookingFrom] = useState<string>('Product')
  const [lookingInto, setLookingInto] = useState<string>('partner-data')
  const [loading, setLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)

  async function look() {
    setLoading(true)
    setRevealed(false)
    // Simulate Gemini call; production hits /api/insights/cross-team
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setRevealed(true)
  }

  const view = sampleVisibility[lookingInto]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal-900 flex items-center gap-2">
          <Eye className="h-7 w-7 text-gold-500" />
          Periscope View
        </h1>
        <p className="mt-1 text-charcoal-500 max-w-2xl">
          Choose who is looking, and what they are looking into. The Periscope reveals Partner data
          and other business units\' data that cannot be seen otherwise.
        </p>
      </div>

      {/* Looking from | Eye | Looking into */}
      <div className="card p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-center">
          {/* Looking from */}
          <div className="rounded-xl border border-charcoal-100 bg-cream-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-gold-600" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal-600">
                Looking from
              </h2>
            </div>
            <p className="text-xs text-charcoal-500 mb-3">Which business unit is looking?</p>
            <div className="flex flex-wrap gap-2">
              {teams.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setLookingFrom(t)
                    setRevealed(false)
                  }}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    lookingFrom === t
                      ? 'bg-gold-400 text-charcoal-900'
                      : 'bg-white border border-charcoal-200 text-charcoal-700 hover:border-gold-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Eye in the middle */}
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-gold-300 bg-gold-50 shadow-elevated">
              <div className="absolute inset-2 rounded-full border-2 border-gold-200 opacity-70" />
              <Eye className="h-8 w-8 text-gold-600 relative z-10" strokeWidth={2} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-700">
              Periscope
            </span>
            <ArrowRight className="h-4 w-4 text-charcoal-300 hidden lg:block absolute" />
          </div>

          {/* Looking into */}
          <div className="rounded-xl border border-charcoal-100 bg-cream-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-gold-600" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal-600">
                Looking into
              </h2>
            </div>
            <p className="text-xs text-charcoal-500 mb-3">Partner data or another unit\'s data</p>
            <div className="space-y-2">
              {lookingIntoOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setLookingInto(opt.id)
                    setRevealed(false)
                  }}
                  className={`w-full text-left rounded-lg border px-3 py-2 transition ${
                    lookingInto === opt.id
                      ? 'border-gold-400 bg-gold-50 ring-1 ring-gold-200'
                      : 'border-charcoal-100 bg-white hover:border-gold-200'
                  }`}
                >
                  <p className="text-sm font-medium text-charcoal-900">{opt.label}</p>
                  <p className="text-xs text-charcoal-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button onClick={look} disabled={loading} className="btn-primary px-8">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Looking through the Periscope\u2026
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Look through the Periscope
              </>
            )}
          </button>
        </div>
      </div>

      {/* Revealed view */}
      {revealed && view && (
        <div className="space-y-4">
          <div className="card border-gold-200 bg-gold-50/50">
            <p className="text-xs uppercase tracking-widest text-gold-700 mb-1">
              {lookingFrom} looking into{' '}
              {lookingIntoOptions.find((o) => o.id === lookingInto)?.label}
            </p>
            <p className="font-display text-lg font-semibold text-charcoal-900">{view.headline}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card">
              <h3 className="font-display font-semibold text-charcoal-900 mb-3">Visible signals</h3>
              <ul className="space-y-2 text-sm text-charcoal-700">
                {view.signals.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="font-display font-semibold text-charcoal-900 mb-3">
                Gaps that cannot be seen otherwise
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-700">
                {view.gaps.map((g) => (
                  <li key={g} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal-400" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
