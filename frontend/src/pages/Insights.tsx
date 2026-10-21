import {
  Sparkles,
  Target,
  Megaphone,
  Tag,
  Mail,
  ArrowRight,
  Eye,
} from 'lucide-react'

const hiddenOpps = [
  {
    title: 'Upsell Opportunity in Enterprise Segment',
    desc: 'Strong product adoption + budget signals in Q2',
    confidence: 92,
  },
  {
    title: 'New Use Case in Mid-Market',
    desc: 'Emerging from support tickets + usage patterns',
    confidence: 87,
  },
  {
    title: 'Pricing Optimization Opportunity',
    desc: 'Customers showing willingness to pay in similar tiers',
    confidence: 79,
  },
  {
    title: 'Win-Back Opportunity',
    desc: 'Churned accounts with renewed needs and buying signals',
    confidence: 74,
  },
]

const actions = [
  {
    title: 'Prioritize Enterprise Upsell Playbook',
    detail: 'Apply to 128 accounts · Est. Impact: $2.4M',
    icon: Target,
  },
  {
    title: 'Launch Mid-Market Use Case Campaign',
    detail: 'Target 230 accounts · Est. Impact: $1.0M',
    icon: Megaphone,
  },
  {
    title: 'Test Pricing Adjustment for Segment X',
    detail: 'A/B Test Ready · Est. Impact: $890K',
    icon: Tag,
  },
  {
    title: 'Win-Back Outreach Sequence',
    detail: '23 accounts · Est. Impact: $570K',
    icon: Mail,
  },
]

export default function Insights() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal-900">
            Opportunity Radar – Powered by Gemini
          </h1>
          <p className="mt-1 text-charcoal-500">
            AI-powered insights across your data. See what others miss.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-charcoal-500">
          <span className="rounded-lg border border-charcoal-200 bg-white px-3 py-1.5">
            Last 30 Days
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Hidden Opportunities */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-charcoal-700 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-holden-500" />
            Hidden Opportunities
          </h2>
          <p className="text-xs text-charcoal-500">AI-detected opportunities with high potential impact.</p>
          {hiddenOpps.map((o) => (
            <div key={o.title} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-charcoal-900 leading-snug">{o.title}</p>
                <span className="shrink-0 rounded-full bg-holden-50 px-2 py-0.5 text-xs font-bold text-holden-700">
                  {o.confidence}%
                </span>
              </div>
              <p className="mt-1.5 text-xs text-charcoal-500">{o.desc}</p>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-charcoal-400 font-medium">
                AI Confidence
              </p>
            </div>
          ))}
          <button className="text-sm font-medium text-holden-600 hover:text-holden-700 flex items-center gap-1">
            View all opportunities <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Radar visualization */}
        <div className="lg:col-span-6">
          <div className="card h-full min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden bg-charcoal-900 text-white">
            {/* Radar rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-80 w-80 rounded-full border border-holden-500/20" />
              <div className="absolute h-56 w-56 rounded-full border border-holden-500/30" />
              <div className="absolute h-32 w-32 rounded-full border border-holden-500/40" />
              <div className="absolute h-4 w-4 rounded-full bg-holden-400 shadow-[0_0_20px_rgba(245,166,0,0.6)]" />
            </div>

            {/* Labels */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-medium text-holden-300">N</div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-holden-300">S</div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-xs font-medium text-holden-300">W</div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-medium text-holden-300">E</div>

            {/* Points */}
            <div className="absolute top-[22%] right-[32%] h-2.5 w-2.5 rounded-full bg-holden-400" title="Q2 Expansion" />
            <div className="absolute top-[28%] right-[22%] h-2 w-2 rounded-full bg-red-400" title="Packaging Gap" />
            <div className="absolute top-[45%] right-[18%] h-2.5 w-2.5 rounded-full bg-holden-400" title="Cross-Sell" />
            <div className="absolute bottom-[30%] right-[28%] h-2 w-2 rounded-full bg-red-400" title="Renewal Risk" />
            <div className="absolute bottom-[25%] left-[30%] h-2.5 w-2.5 rounded-full bg-holden-400" title="Emerging Need" />
            <div className="absolute top-[40%] left-[20%] h-2 w-2 rounded-full bg-red-400" title="Competitive Win" />
            <div className="absolute top-[30%] left-[28%] h-2.5 w-2.5 rounded-full bg-holden-400" title="Budget Signal" />

            <div className="relative z-10 text-center mt-auto mb-6">
              <p className="text-sm font-semibold tracking-wide text-holden-300">PERISCOPE AI RADAR</p>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs text-charcoal-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-holden-400" /> Opportunity
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400" /> Risk
                </span>
              </div>
              <p className="mt-2 text-[11px] text-charcoal-400 flex items-center justify-center gap-1">
                <Eye className="h-3 w-3" /> Hover or tap a point for AI insights
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-charcoal-700 flex items-center gap-2">
            Recommended Actions
          </h2>
          <p className="text-xs text-charcoal-500">AI-powered next steps. One click to act.</p>
          {actions.map((a) => (
            <div key={a.title} className="card p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-holden-50 text-holden-600">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-charcoal-900 leading-snug">{a.title}</p>
                  <p className="text-xs text-charcoal-500 mt-0.5">{a.detail}</p>
                  <button className="mt-2 text-xs font-semibold text-holden-600 hover:text-holden-700">
                    Act Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="text-sm font-medium text-holden-600 hover:text-holden-700 flex items-center gap-1">
            View all recommendations <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Cross-BU Blind Spots */}
      <div className="card">
        <h2 className="font-display font-semibold text-charcoal-900 mb-1">Cross-BU Blind Spots</h2>
        <p className="text-sm text-charcoal-500 mb-5">
          Insights that only appear when Sales + Product + Marketing data is combined.
        </p>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <div className="flex-1 rounded-lg bg-charcoal-800 text-white p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-charcoal-300">Sales</p>
            <p className="mt-1 text-sm font-medium">Deal insights & signals</p>
          </div>
          <div className="flex items-center justify-center text-charcoal-400 text-xl">+</div>
          <div className="flex-1 rounded-lg bg-charcoal-800 text-white p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-charcoal-300">Product</p>
            <p className="mt-1 text-sm font-medium">Usage & adoption patterns</p>
          </div>
          <div className="flex items-center justify-center text-charcoal-400 text-xl">+</div>
          <div className="flex-1 rounded-lg bg-charcoal-800 text-white p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-charcoal-300">Marketing</p>
            <p className="mt-1 text-sm font-medium">Campaign & engagement data</p>
          </div>
          <div className="flex items-center justify-center text-holden-500 text-xl font-bold">=</div>
          <div className="flex-1 rounded-lg bg-holden-500 text-white p-4 text-center">
            <p className="text-xs uppercase tracking-wider text-holden-100">Combined Insight</p>
            <p className="mt-1 text-sm font-medium">
              $3.2M expansion opportunity hidden in plain sight
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="btn-primary text-sm">
            <Sparkles className="h-4 w-4" />
            Explore Blind Spots
          </button>
        </div>
      </div>
    </div>
  )
}
