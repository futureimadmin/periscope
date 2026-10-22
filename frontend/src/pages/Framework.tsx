import { useState } from 'react'
import {
  Plus,
  Link2,
  ArrowRight,
  ArrowLeft,
  Anchor,
  Building2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

type Hook = {
  id: string
  label: string
  description: string
  allowed_requester_bus: string[]
  info_types: string[]
}

type Step = {
  id: string
  title: string
  description: string
  prev_step_id: string | null
  next_step_id: string | null
  hooks: Hook[]
}

type FrameworkModel = {
  id: string
  bu: string
  name: string
  status: 'draft' | 'published'
  steps: Step[]
}

const BUS = ['Sales', 'Marketing', 'Product', 'Development']

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

function relink(steps: Step[]): Step[] {
  return steps.map((s, i) => ({
    ...s,
    prev_step_id: i > 0 ? steps[i - 1].id : null,
    next_step_id: i < steps.length - 1 ? steps[i + 1].id : null,
  }))
}

const seedProduct: FrameworkModel = {
  id: 'fw_product_demo',
  bu: 'Product',
  name: 'Product partnership intake',
  status: 'draft',
  steps: relink([
    {
      id: 'step_a',
      title: 'Intake request',
      description: 'Capture partner capability need',
      prev_step_id: null,
      next_step_id: null,
      hooks: [],
    },
    {
      id: 'step_b',
      title: 'Capacity check',
      description: 'Validate engineering capacity',
      prev_step_id: null,
      next_step_id: null,
      hooks: [
        {
          id: 'hook_cap',
          label: 'Capacity signal',
          description: 'Other BUs can request capacity visibility',
          allowed_requester_bus: ['Sales', 'Marketing'],
          info_types: ['capacity_pct', 'next_available_sprint'],
        },
      ],
    },
    {
      id: 'step_c',
      title: 'Commit roadmap slot',
      description: 'Reserve delivery window',
      prev_step_id: null,
      next_step_id: null,
      hooks: [],
    },
  ]),
}

export default function Framework() {
  const [bu, setBu] = useState('Product')
  const [framework, setFramework] = useState<FrameworkModel>(seedProduct)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(
    seedProduct.steps[1]?.id ?? null
  )
  const [newStepTitle, setNewStepTitle] = useState('')
  const [hookLabel, setHookLabel] = useState('')
  const [hookAllowed, setHookAllowed] = useState<string[]>(['Sales'])

  const selected = framework.steps.find((s) => s.id === selectedStepId) ?? null

  function setOwningBu(next: string) {
    setBu(next)
    setFramework({
      id: uid('fw'),
      bu: next,
      name: `${next} framework`,
      status: 'draft',
      steps: [],
    })
    setSelectedStepId(null)
  }

  function addStep() {
    const title = newStepTitle.trim() || `Step ${framework.steps.length + 1}`
    const step: Step = {
      id: uid('step'),
      title,
      description: '',
      prev_step_id: null,
      next_step_id: null,
      hooks: [],
    }
    const steps = relink([...framework.steps, step])
    setFramework((f) => ({ ...f, steps, status: 'draft' }))
    setSelectedStepId(step.id)
    setNewStepTitle('')
  }

  function addHook() {
    if (!selected) return
    const label = hookLabel.trim() || 'Info hook'
    const hook: Hook = {
      id: uid('hook'),
      label,
      description: 'Other BUs can connect to request information',
      allowed_requester_bus: hookAllowed,
      info_types: ['custom'],
    }
    const steps = framework.steps.map((s) =>
      s.id === selected.id ? { ...s, hooks: [...s.hooks, hook] } : s
    )
    setFramework((f) => ({ ...f, steps: relink(steps) }))
    setHookLabel('')
  }

  function publish() {
    if (framework.steps.length === 0) return
    setFramework((f) => ({ ...f, status: 'published' }))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-700">
            Depth Edition · Framework Builder
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-charcoal-900">
            Build a framework for your BU
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-charcoal-600">
            Each business unit owns its own framework. Add steps as a doubly linked chain.
            Put hooks on steps so other BUs can request information — when published, Surface
            can see that data through the Periscope.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              framework.status === 'published'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-cream-200 text-charcoal-700'
            }`}
          >
            {framework.status}
          </span>
          <button
            type="button"
            onClick={publish}
            disabled={framework.steps.length === 0 || framework.status === 'published'}
            className="btn-primary disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            Publish framework
          </button>
        </div>
      </div>

      <div className="card flex flex-wrap items-center gap-3">
        <Building2 className="h-5 w-5 text-gold-700" />
        <span className="text-sm font-medium text-charcoal-700">Owning BU</span>
        <div className="flex flex-wrap gap-2">
          {BUS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setOwningBu(b)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                bu === b
                  ? 'bg-gold-400 text-charcoal-900'
                  : 'bg-cream-100 text-charcoal-600 hover:bg-cream-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-charcoal-500">{framework.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card space-y-4 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">
              Steps (doubly linked)
            </h2>
            <span className="text-xs text-charcoal-500">{framework.steps.length} steps</span>
          </div>

          {framework.steps.length === 0 ? (
            <p className="rounded-lg border border-dashed border-charcoal-200 bg-cream-50 p-6 text-center text-sm text-charcoal-500">
              No steps yet. Add the first step to start this BU's framework.
            </p>
          ) : (
            <ol className="space-y-3">
              {framework.steps.map((step, index) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedStepId(step.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedStepId === step.id
                        ? 'border-gold-400 bg-gold-50 shadow-sm'
                        : 'border-charcoal-100 bg-white hover:border-gold-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal-900 text-sm font-bold text-gold-400">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-charcoal-900">{step.title}</p>
                        {step.description && (
                          <p className="mt-0.5 text-xs text-charcoal-500">{step.description}</p>
                        )}
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide text-charcoal-400">
                          {step.prev_step_id ? (
                            <span className="inline-flex items-center gap-1">
                              <ArrowLeft className="h-3 w-3" /> prev
                            </span>
                          ) : (
                            <span>head</span>
                          )}
                          <span>·</span>
                          {step.next_step_id ? (
                            <span className="inline-flex items-center gap-1">
                              next <ArrowRight className="h-3 w-3" />
                            </span>
                          ) : (
                            <span>tail</span>
                          )}
                          {step.hooks.length > 0 && (
                            <>
                              <span>·</span>
                              <span className="inline-flex items-center gap-1 text-gold-700">
                                <Anchor className="h-3 w-3" />
                                {step.hooks.length} hook{step.hooks.length > 1 ? 's' : ''}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  {index < framework.steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <Link2 className="h-4 w-4 rotate-90 text-charcoal-300" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}

          <div className="flex gap-2 border-t border-charcoal-100 pt-4">
            <input
              className="input flex-1"
              placeholder="New step title…"
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addStep()}
              disabled={framework.status === 'published'}
            />
            <button
              type="button"
              className="btn-primary shrink-0"
              onClick={addStep}
              disabled={framework.status === 'published'}
            >
              <Plus className="h-4 w-4" />
              Add step
            </button>
          </div>
        </div>

        <div className="card space-y-4 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-charcoal-900">Hooks on step</h2>
          {!selected ? (
            <p className="text-sm text-charcoal-500">Select a step to manage hooks.</p>
          ) : (
            <>
              <div className="rounded-lg bg-cream-50 p-3">
                <p className="text-sm font-semibold text-charcoal-800">{selected.title}</p>
                <p className="text-xs text-charcoal-500">
                  Other BUs connect here to request information from {framework.bu}.
                </p>
              </div>
              <ul className="space-y-2">
                {selected.hooks.length === 0 && (
                  <li className="text-sm text-charcoal-500">No hooks yet on this step.</li>
                )}
                {selected.hooks.map((h) => (
                  <li
                    key={h.id}
                    className="rounded-lg border border-charcoal-100 bg-white p-3 text-sm"
                  >
                    <div className="flex items-center gap-2 font-medium text-charcoal-900">
                      <Anchor className="h-4 w-4 text-gold-600" />
                      {h.label}
                    </div>
                    <p className="mt-1 text-xs text-charcoal-500">{h.description}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-charcoal-400">
                      Allowed: {h.allowed_requester_bus.join(', ') || 'any BU'}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-charcoal-100 pt-4">
                <input
                  className="input"
                  placeholder="Hook label (e.g. Capacity signal)"
                  value={hookLabel}
                  onChange={(e) => setHookLabel(e.target.value)}
                  disabled={framework.status === 'published'}
                />
                <div className="flex flex-wrap gap-2">
                  {BUS.filter((b) => b !== framework.bu).map((b) => (
                    <button
                      key={b}
                      type="button"
                      disabled={framework.status === 'published'}
                      onClick={() =>
                        setHookAllowed((prev) =>
                          prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
                        )
                      }
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        hookAllowed.includes(b)
                          ? 'bg-gold-200 text-charcoal-900'
                          : 'bg-cream-100 text-charcoal-500'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-secondary w-full"
                  onClick={addHook}
                  disabled={framework.status === 'published'}
                >
                  <Plus className="h-4 w-4" />
                  Add hook
                </button>
              </div>
            </>
          )}
          <div className="rounded-lg border border-dashed border-gold-300 bg-gold-50 p-3 text-xs text-charcoal-700">
            <Sparkles className="mb-1 inline h-3.5 w-3.5 text-gold-700" /> Once a hook connection
            is approved and info is published, <strong>Surface Edition</strong> can show it in
            Looking from / Looking into.
          </div>
        </div>
      </div>
    </div>
  )
}
