import { useState } from 'react'
import { Sparkles, Loader2, Anchor } from 'lucide-react'
import PeriscopeIcon from '../components/PeriscopeIcon'

const teams = ['Sales', 'Marketing', 'Product', 'Development']

/** Demo feed: published hooks (mirrors GET /surface/visibility) */
const publishedByProvider: Record<
  string,
  { hook: string; step: string; info: Record<string, string | number> }[]
> = {
  Product: [
    {
      hook: 'Capacity signal',
      step: 'Capacity check',
      info: { capacity_pct: 80, next_available_sprint: 'Sprint 42' },
    },
  ],
  Sales: [
    {
      hook: 'Pipeline signal',
      step: 'Qualify partner',
      info: { open_partner_deals: 12, weighted_pipeline: '$2.4M' },
    },
  ],
  Marketing: [
    {
      hook: 'Demand themes',
      step: 'Campaign planning',
      info: { top_theme: 'Partner portal', webinar_pipeline: 340 },
    },
  ],
  Development: [
    {
      hook: 'Sprint load',
      step: 'Sprint planning',
      info: { health: 'Yellow', free_capacity: '1 sprint' },
    },
  ],
}

export default function PeriscopeView() {
  const [lookingFrom, setLookingFrom] = useState('Sales')
  const [lookingInto, setLookingInto] = useState('Product')
  const [loading, setLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)

  async function look() {
    setLoading(true)
    setRevealed(false)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    setRevealed(true)
  }

  const visible =
    lookingFrom !== lookingInto ? publishedByProvider[lookingInto] ?? [] : []

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">
          Surface Edition · Periscope View
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-charcoal-900">
          See things that cannot be seen otherwise
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-charcoal-600">
          Looking from your BU into another BU shows information published through{' '}
          <strong>hooks</strong> on their framework steps — partner and cross-unit data
          that Depth established and published.
        </p>
      </div>

      <div className="card flex flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center">
        <div className="flex-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
            Looking from
          </label>
          <select
            className="input"
            value={lookingFrom}
            onChange={(e) => {
              setLookingFrom(e.target.value)
              setRevealed(false)
            }}
          >
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center px-4">
          <PeriscopeIcon className="h-20 w-20 text-gold-500" />
          <button type="button" className="btn-primary mt-3" onClick={look} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Looking…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Look through
              </>
            )}
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
            Looking into
          </label>
          <select
            className="input"
            value={lookingInto}
            onChange={(e) => {
              setLookingInto(e.target.value)
              setRevealed(false)
            }}
          >
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {revealed && (
        <div className="card space-y-4">
          <h2 className="font-display text-lg font-semibold text-charcoal-900">
            Visible via established hooks
          </h2>
          <p className="text-sm text-charcoal-600">
            <span className="font-medium text-charcoal-800">{lookingFrom}</span> looking into{' '}
            <span className="font-medium text-charcoal-800">{lookingInto}</span>
          </p>

          {lookingFrom === lookingInto ? (
            <p className="text-sm text-charcoal-500">
              Choose a different BU to look into — hooks expose another unit's published
              step data.
            </p>
          ) : visible.length === 0 ? (
            <p className="rounded-lg border border-dashed border-charcoal-200 bg-cream-50 p-4 text-sm text-charcoal-500">
              No active published hooks from {lookingInto} for {lookingFrom} yet. In Depth,
              add a hook on a step, connect, approve, and publish.
            </p>
          ) : (
            <ul className="space-y-3">
              {visible.map((v) => (
                <li
                  key={v.hook}
                  className="rounded-xl border border-gold-200 bg-gold-50/50 p-4"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-charcoal-900">
                    <Anchor className="h-4 w-4 text-gold-700" />
                    {v.hook}
                    <span className="font-normal text-charcoal-500">· step: {v.step}</span>
                  </div>
                  <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                    {Object.entries(v.info).map(([k, val]) => (
                      <div key={k} className="rounded-lg bg-white/80 px-3 py-2 text-sm">
                        <dt className="text-[10px] uppercase tracking-wide text-charcoal-400">
                          {k}
                        </dt>
                        <dd className="font-medium text-charcoal-800">{String(val)}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
