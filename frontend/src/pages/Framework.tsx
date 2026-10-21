import { useState } from 'react'
import {
  Target,
  Handshake,
  Users,
  Puzzle,
  Sparkles,
  Save,
  Eye,
  Rocket,
  AlertTriangle,
} from 'lucide-react'

const templates = [
  {
    id: 'strategic',
    title: 'Strategic Alliance',
    desc: 'Build strategic, long-term partnerships with shared vision and joint accountability.',
    icon: Target,
  },
  {
    id: 'channel',
    title: 'Channel Partner',
    desc: 'Scale through indirect channels and drive mutual revenue growth.',
    icon: Handshake,
  },
  {
    id: 'cosell',
    title: 'Co-Sell',
    desc: 'Collaborate on sales opportunities and go-to-market motions.',
    icon: Users,
  },
  {
    id: 'tech',
    title: 'Technology Partner',
    desc: 'Integrate solutions and deliver combined value to customers.',
    icon: Puzzle,
  },
]

const stages = [
  {
    id: 1,
    name: 'Discovery',
    objectives: 'Identify and qualify potential partners.',
    activities: ['Market scanning', 'Initial outreach', 'Qualification call'],
    metrics: ['Qualified opportunities', 'Meeting conversion rate'],
    risks: ['Misalignment on strategic fit'],
  },
  {
    id: 2,
    name: 'Negotiation',
    objectives: 'Align on value, terms, and ways of working.',
    activities: ['Value modeling', 'Terms negotiation', 'Governance alignment'],
    metrics: ['Term sheet completion', 'Negotiation cycle time'],
    risks: ['Deadlocked negotiations'],
  },
  {
    id: 3,
    name: 'Formalization',
    objectives: 'Document and approve partnership agreement.',
    activities: ['Contract drafting', 'Legal & compliance review', 'Executive approval'],
    metrics: ['Contract approval rate', 'Time to sign'],
    risks: ['Approval delays'],
  },
  {
    id: 4,
    name: 'Activation',
    objectives: 'Launch collaboration and enable teams.',
    activities: ['Onboarding & training', 'Playbook alignment', 'Tool & system access'],
    metrics: ['Time to first opportunity', 'Team adoption rate'],
    risks: ['Slow adoption'],
  },
  {
    id: 5,
    name: 'Value Realization',
    objectives: 'Deliver value and track performance.',
    activities: ['Joint pipeline mgmt', 'Customer delivery', 'Performance tracking'],
    metrics: ['Revenue impact', 'Customer satisfaction'],
    risks: ['Value leakage'],
  },
  {
    id: 6,
    name: 'Renewal',
    objectives: 'Evaluate outcomes and renew or evolve.',
    activities: ['Business review', 'Capture learnings', 'Renew or expand'],
    metrics: ['Renewal rate', 'Expansion revenue'],
    risks: ['Renewal risk'],
  },
]

export default function Framework() {
  const [selected, setSelected] = useState('strategic')

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal-900">Framework Builder</h1>
          <p className="mt-1 text-charcoal-500">
            Design, structure, and publish partnership frameworks that drive measurable outcomes.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button className="btn-primary">
            <Save className="h-4 w-4" />
            Save Framework
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Templates */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wider">
            Framework Templates
          </h2>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left card p-4 transition ${
                selected === t.id
                  ? 'border-gold-400 ring-1 ring-gold-200 bg-gold-50'
                  : 'hover:border-gold-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <t.icon className="h-4 w-4 text-gold-600" />
                <span className="font-medium text-charcoal-900 text-sm">{t.title}</span>
              </div>
              <p className="text-xs text-charcoal-500 leading-relaxed">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* Stages canvas */}
        <div className="lg:col-span-6">
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-charcoal-900">Partnership Framework</span>
                <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-medium text-gold-800">
                  Draft v0.3
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="rounded-lg border border-charcoal-100 p-4 hover:border-gold-200 transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-charcoal-900 text-xs font-bold">
                      {stage.id}
                    </span>
                    <h3 className="font-semibold text-charcoal-900">{stage.name}</h3>
                  </div>
                  <p className="text-sm text-charcoal-600 mb-3">{stage.objectives}</p>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="font-medium text-charcoal-500 mb-1">Key Activities</p>
                      <ul className="space-y-0.5 text-charcoal-700">
                        {stage.activities.map((a) => (
                          <li key={a}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-500 mb-1">Success Metrics</p>
                      <ul className="space-y-0.5 text-charcoal-700">
                        {stage.metrics.map((m) => (
                          <li key={m}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-500 mb-1 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-amber-500" /> Key Risks
                      </p>
                      <ul className="space-y-0.5 text-charcoal-700">
                        {stage.risks.map((r) => (
                          <li key={r}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className="mt-3 flex justify-center">
                      <div className="h-4 w-px bg-gold-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assist */}
        <div className="lg:col-span-3">
          <div className="card sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-gold-500" />
              <h2 className="font-semibold text-charcoal-900">AI Assist (Gemini)</h2>
              <span className="ml-auto rounded bg-gold-100 px-1.5 py-0.5 text-[10px] font-medium text-gold-800">
                Beta
              </span>
            </div>
            <p className="text-xs text-charcoal-500 mb-4">
              Get AI suggestions for stage templates, content, and risk mitigation.
            </p>

            <div className="space-y-3">
              <div className="rounded-lg border border-charcoal-100 p-3">
                <p className="text-sm font-medium text-charcoal-800">Improve Discovery</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  Add "Partner landscape analysis" as a key activity.
                </p>
                <button className="mt-2 text-xs font-medium text-gold-700 hover:text-gold-800">
                  Apply
                </button>
              </div>
              <div className="rounded-lg border border-charcoal-100 p-3">
                <p className="text-sm font-medium text-charcoal-800">Negotiation Best Practice</p>
                <p className="text-xs text-charcoal-500 mt-1">
                  Include "BATNA definition" in success metrics.
                </p>
                <button className="mt-2 text-xs font-medium text-gold-700 hover:text-gold-800">
                  Apply
                </button>
              </div>
              <div className="rounded-lg border border-charcoal-100 p-3 bg-amber-50 border-amber-100">
                <p className="text-sm font-medium text-charcoal-800 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  High Risk: Renewal
                </p>
                <p className="text-xs text-charcoal-600 mt-1">
                  Consider adding: Executive sponsor review, Value score dashboard.
                </p>
              </div>
            </div>

            <button className="mt-4 w-full btn-primary text-sm">
              <Rocket className="h-4 w-4" />
              Publish Framework
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
