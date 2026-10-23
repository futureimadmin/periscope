import {
  Users,
  TrendingUp,
  Star,
  Shield,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

const metrics = [
  {
    label: 'Active Partnerships',
    value: '48',
    change: '+12% vs last month',
    icon: Users,
    trend: 'up',
  },
  {
    label: 'Growth Pipeline',
    value: '+23%',
    change: '+8% vs last month',
    icon: TrendingUp,
    trend: 'up',
  },
  {
    label: 'Partner CSAT',
    value: '92',
    change: '+5 pts vs last quarter',
    icon: Star,
    trend: 'up',
  },
  {
    label: 'Cross-team Health',
    value: '87',
    change: '+7 pts vs last month',
    icon: Shield,
    trend: 'up',
  },
]

const heatmap = [
  { dim: 'Strategic Fit', product: 82, growth: 76, enterprise: 91, platform: 68 },
  { dim: 'Value & Impact', product: 74, growth: 88, enterprise: 79, platform: 71 },
  { dim: 'Relationship Strength', product: 90, growth: 85, enterprise: 93, platform: 77 },
  { dim: 'Operational Alignment', product: 69, growth: 73, enterprise: 84, platform: 88 },
]

const opportunities = [
  { title: 'Expand with Northbeam', desc: 'High synergy in data infrastructure.', score: 92, tag: 'High Impact' },
  { title: 'Co-build with Vertex', desc: 'Joint solution opportunity identified.', score: 87, tag: 'Strategic' },
  { title: 'Deepen with Ladder', desc: 'Cross-sell potential across teams.', score: 75, tag: 'Growth' },
]

const insights = [
  { title: 'Pipeline acceleration', body: 'Your growth pipeline is strongest in Enterprise and Platform. Consider doubling down on mid-market expansion.' },
  { title: 'Health opportunity', body: '3 partnerships show early signs of risk. Review relationship plans in the next 7 days.' },
  { title: 'Untapped potential', body: '6 partners have high strategic fit but low engagement. AI suggests re-engagement plays.' },
]

function scoreColor(score: number) {
  if (score >= 85) return 'bg-gold-400 text-charcoal-900'
  if (score >= 70) return 'bg-gold-200 text-gold-900'
  return 'bg-cream-200 text-charcoal-700'
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal-900">Command Centre</h1>
          <p className="mt-1 text-charcoal-500">
            Partnership health, growth signals and cross-team visibility at a glance.
          </p>
        </div>
        <div className="hidden lg:flex h-28 w-28 items-center justify-center rounded-full border-4 border-gold-200 bg-gold-50 relative">
          <div className="absolute inset-3 rounded-full border-2 border-gold-300 opacity-60" />
          <div className="absolute inset-6 rounded-full border border-gold-400 opacity-40" />
          <div className="h-4 w-4 rounded-full bg-gold-400 shadow-lg" />
          <span className="absolute -bottom-5 text-[10px] font-medium text-gold-700 uppercase tracking-wider">
            Ecosystem
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-charcoal-500">{m.label}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-charcoal-900">{m.value}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-gold-700">
                  <ArrowUpRight className="h-3 w-3" />
                  {m.change}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100 text-gold-700">
                <m.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-charcoal-900">Partnership Health Heatmap</h2>
            <span className="text-xs text-charcoal-400">by strategic dimension</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-charcoal-500">
                  <th className="pb-2 font-medium">Dimension</th>
                  <th className="pb-2 font-medium text-center">Product</th>
                  <th className="pb-2 font-medium text-center">Growth</th>
                  <th className="pb-2 font-medium text-center">Ent.</th>
                  <th className="pb-2 font-medium text-center">Plat.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-50">
                {heatmap.map((row) => (
                  <tr key={row.dim}>
                    <td className="py-2.5 text-charcoal-700 font-medium">{row.dim}</td>
                    {[row.product, row.growth, row.enterprise, row.platform].map((v, i) => (
                      <td key={i} className="py-2.5 text-center">
                        <span className={`inline-flex h-8 w-10 items-center justify-center rounded text-xs font-semibold ${scoreColor(v)}`}>
                          {v}%
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-charcoal-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-cream-200" /> Lower
            <span className="h-2.5 w-2.5 rounded-sm bg-gold-200" /> Mid
            <span className="h-2.5 w-2.5 rounded-sm bg-gold-400" /> Higher Health
          </div>
        </div>

        <div className="card lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-charcoal-900">AI-generated Opportunities</h2>
            <span className="text-xs text-gold-700 font-medium">Powered by Periscope AI</span>
          </div>
          <ul className="space-y-3">
            {opportunities.map((o) => (
              <li key={o.title} className="rounded-lg border border-charcoal-100 p-3 hover:border-gold-200 transition">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-charcoal-900 text-sm">{o.title}</p>
                    <p className="text-xs text-charcoal-500 mt-0.5">{o.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-800">
                    {o.score}
                  </span>
                </div>
                <span className="mt-2 inline-block text-[10px] uppercase tracking-wider text-charcoal-400 font-medium">
                  {o.tag}
                </span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full text-sm font-medium text-gold-700 hover:text-gold-800 flex items-center justify-center gap-1">
            View all opportunities <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="card lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-charcoal-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-500" />
              Gemini Insights
            </h2>
            <span className="text-xs text-charcoal-400">Updated just now</span>
          </div>
          <ul className="space-y-4">
            {insights.map((ins) => (
              <li key={ins.title} className="border-l-2 border-gold-300 pl-3">
                <p className="text-sm font-medium text-charcoal-900">{ins.title}</p>
                <p className="mt-1 text-xs text-charcoal-600 leading-relaxed">{ins.body}</p>
              </li>
            ))}
          </ul>
          <button className="mt-5 btn-primary w-full text-sm">
            <Sparkles className="h-4 w-4" />
            Ask Gemini
          </button>
        </div>
      </div>

      <div className="card flex items-center gap-3 bg-gold-50 border-gold-100">
        <div className="h-2.5 w-2.5 rounded-full bg-gold-400 animate-pulse" />
        <div>
          <p className="text-sm font-medium text-charcoal-900">Periscope Lens</p>
          <p className="text-xs text-charcoal-600">Scanning Partner data and cross-team signals live.</p>
        </div>
      </div>
    </div>
  )
}
