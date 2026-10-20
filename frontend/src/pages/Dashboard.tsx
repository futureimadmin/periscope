import { TrendingUp, Users, Target, Heart } from 'lucide-react'

const stats = [
  { label: 'Active Partnerships', value: '24', change: '+3 this quarter', icon: Users, color: 'text-gold-400' },
  { label: 'Growth Impact', value: '+18%', change: 'YoY revenue attribution', icon: TrendingUp, color: 'text-emerald-400' },
  { label: 'Market Position', value: 'Top 3', change: 'in target segment', icon: Target, color: 'text-sky-400' },
  { label: 'Partner CSAT', value: '4.6', change: '↑ 0.3 vs last half', icon: Heart, color: 'text-rose-400' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-charcoal-50">Dashboard</h2>
        <p className="mt-1 text-charcoal-300">
          Partnership health, growth signals and customer satisfaction at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-charcoal-300">{s.label}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs text-charcoal-400">{s.change}</p>
              </div>
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-display text-lg font-semibold text-gold-400">Recent Periscope Insights</h3>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-200">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              Sales visibility into Product roadmap gaps reduced deal cycle time by 12 days on average.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              Marketing + Development joint campaign framework recommended for Q4 launch partners.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              Three high-value partners flagged as "at risk" — proactive outreach suggested.
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="font-display text-lg font-semibold text-gold-400">Partnership Framework Status</h3>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Formalized partnerships</span>
                <span className="text-gold-400">68%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-charcoal-700">
                <div className="h-2 rounded-full bg-gold-400" style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Cross-team visibility coverage</span>
                <span className="text-gold-400">82%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-charcoal-700">
                <div className="h-2 rounded-full bg-gold-400" style={{ width: '82%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>AI-assisted reviews this month</span>
                <span className="text-gold-400">41</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
