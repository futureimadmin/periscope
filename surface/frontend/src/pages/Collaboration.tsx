import { MessageSquare, FileText, Clock, Gavel, Radio } from 'lucide-react'

const spaces = [
  {
    name: 'Acme Corp Strategic Alliance',
    status: 'Active',
    teams: ['Sales', 'Marketing', 'Product', 'Development'],
    lastActivity: '2m ago',
    signals: 3,
  },
  {
    name: 'Northbeam Data Alliance',
    status: 'Active',
    teams: ['Sales', 'Product'],
    lastActivity: '1h ago',
    signals: 1,
  },
  {
    name: 'Cross-Functional Growth Pod',
    status: 'Active',
    teams: ['Sales', 'Marketing', 'Product', 'Development'],
    lastActivity: 'Yesterday',
    signals: 0,
  },
]

export default function Collaboration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal-900">Collaboration Spaces</h1>
        <p className="mt-1 text-charcoal-500">
          Shared canvases where Sales, Marketing, Product and Development work on partnerships
          together — decisions, documents, timeline and signals in one place.
        </p>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="border-b border-charcoal-100 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-semibold text-charcoal-900">Acme Corp Strategic Alliance</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>
          <div className="flex gap-2 text-xs">
            {['Sales', 'Marketing', 'Product', 'Development'].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-1 font-medium ${
                  i === 0
                    ? 'bg-gold-100 text-gold-800'
                    : i === 1
                    ? 'bg-orange-50 text-orange-800'
                    : i === 2
                    ? 'bg-teal-50 text-teal-800'
                    : 'bg-sky-50 text-sky-800'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-charcoal-100">
          <div className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-charcoal-700 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gold-600" /> Shared Partnership Canvas
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-gold-50 p-3 text-charcoal-800">Grow joint revenue to $10M ARR by EOY</div>
              <div className="rounded-lg bg-orange-50 p-3 text-charcoal-800">Expand co-sell motions in North America</div>
              <div className="rounded-lg bg-teal-50 p-3 text-charcoal-800">Seamless integrated experience</div>
              <div className="rounded-lg bg-sky-50 p-3 text-charcoal-800">Mutual customer success & retention</div>
            </div>
            <div>
              <p className="text-xs font-medium text-charcoal-500 mb-2">Shared documents</p>
              <ul className="text-sm text-charcoal-700 space-y-1">
                <li>Joint Business Plan Q2–Q4 2025</li>
                <li>Co-Sell Playbook v2.1</li>
                <li>Integration Roadmap Q2 2025</li>
              </ul>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-charcoal-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-600" /> Timeline & decisions
            </h3>
            <ul className="text-sm text-charcoal-700 space-y-2">
              <li className="flex gap-2"><span className="text-gold-500">●</span> Partnership launched</li>
              <li className="flex gap-2"><span className="text-gold-500">●</span> Initial integration complete</li>
              <li className="flex gap-2"><span className="text-gold-500">●</span> Co-sell program kickoff</li>
            </ul>
            <div>
              <p className="text-xs font-medium text-charcoal-500 mb-2 flex items-center gap-1">
                <Gavel className="h-3.5 w-3.5" /> Decision log
              </p>
              <ul className="text-xs text-charcoal-600 space-y-1">
                <li>Approved joint GTM for Enterprise segment</li>
                <li>Prioritized bidirectional user sync</li>
                <li>Agreed on co-branded campaign budget</li>
              </ul>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-charcoal-700 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gold-600" /> Live activity
            </h3>
            <ul className="text-sm text-charcoal-700 space-y-3">
              <li>
                <span className="font-medium">Alex Rivera (Sales)</span>
                <span className="text-charcoal-500"> updated Co-Sell Playbook</span>
                <span className="block text-xs text-charcoal-400">2m ago</span>
              </li>
              <li>
                <span className="font-medium">Jordan Kim (Marketing)</span>
                <span className="text-charcoal-500"> added campaign brief</span>
                <span className="block text-xs text-charcoal-400">8m ago</span>
              </li>
              <li>
                <span className="font-medium">Priya Shah (Product)</span>
                <span className="text-charcoal-500"> completed API roadmap milestone</span>
                <span className="block text-xs text-charcoal-400">15m ago</span>
              </li>
            </ul>
            <button className="btn-primary w-full text-sm">
              <Radio className="h-4 w-4" />
              Raise Signal
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display font-semibold text-charcoal-900 mb-3">All collaboration spaces</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {spaces.map((s) => (
            <div key={s.name} className="card hover:shadow-elevated transition cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-charcoal-900 text-sm">{s.name}</h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  {s.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.teams.map((t) => (
                  <span key={t} className="rounded-full bg-charcoal-100 px-2 py-0.5 text-[10px] text-charcoal-600">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-charcoal-500">
                Last activity {s.lastActivity}
                {s.signals > 0 && ` · ${s.signals} open signals`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
