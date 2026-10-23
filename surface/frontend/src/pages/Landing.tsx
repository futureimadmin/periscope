import { Link } from 'react-router-dom'
import {
  Eye,
  Layers,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Database,
} from 'lucide-react'
import PeriscopeIcon from '../components/PeriscopeIcon'

const benefits = [
  {
    icon: Eye,
    title: 'See Data That Cannot Be Seen Otherwise',
    description:
      "One business unit can look through the Periscope and gain visibility into Partner data and other business units' data — information that is normally locked behind silos.",
  },
  {
    icon: Database,
    title: 'Partner + Cross-BU Visibility',
    description:
      'Sales can see Product roadmap signals. Marketing can see Development capacity. Product can see pipeline intent. Everyone can see relevant Partner data in context.',
  },
  {
    icon: Users,
    title: 'Shared Collaboration Spaces',
    description:
      'Sales, Marketing, Product and Development share signals, decisions and context on a common canvas — visibility that supports joint work.',
  },
  {
    icon: Sparkles,
    title: 'Gemini-Powered Insights',
    description:
      'AI surfaces opportunities, risks and blind spots that only become visible when Partner data is combined with Sales + Product + Marketing signals.',
  },
  {
    icon: TrendingUp,
    title: 'Accelerate Growth & Satisfaction',
    description:
      'Link what you can now see — pipeline, health, partner CSAT — to action. Act on what was previously invisible.',
  },
  {
    icon: Layers,
    title: 'Formalise Without Friction',
    description:
      'Framework Builder and step/hook operating models live in Depth Edition — the submerged structure for how partnerships are run, not only viewed.',
    badge: 'Depth Edition',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-charcoal-100 bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PeriscopeIcon className="h-9 w-9 shrink-0" />
            <span className="font-display text-lg font-bold text-charcoal-900">Periscope</span>
            <span className="ml-2 rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-medium text-gold-800">
              Surface Edition
            </span>
          </div>
          <Link to="/app" className="btn-primary">
            Open Periscope
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-cream-100 border border-charcoal-100 px-4 py-1.5 text-sm font-medium text-charcoal-800 mb-6">
            <PeriscopeIcon className="h-5 w-5" />
            See things that cannot be seen otherwise
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 max-w-3xl mx-auto leading-tight">
            Look through the Periscope and see{' '}
            <span className="text-gold-600">Partner & cross-team data</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Surface Edition brings visibility: any business unit can look through the Periscope
            into Partner data and other business units' data — information that is normally
            invisible due to organisational silos. Depth Edition holds the submerged operating
            model (Framework Builder) for how partnerships are formalised.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app" className="btn-primary text-base px-6 py-3">
              Launch Surface Edition
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#benefits" className="btn-secondary text-base px-6 py-3">
              Why Periscope?
            </a>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 bg-white border-y border-charcoal-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-charcoal-900">
              Benefits of Surface Edition
            </h2>
            <p className="mt-3 text-charcoal-600 max-w-xl mx-auto">
              Designed so that one team can look through the Periscope and finally see
              Partner data and other business units' data that was previously out of reach.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description, badge }) => (
              <div
                key={title}
                className="card hover:shadow-elevated transition-shadow duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-100 text-gold-700">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  {badge && (
                    <span className="rounded-full border border-charcoal-200 bg-cream-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal-600">
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900">{title}</h3>
                <p className="mt-2 text-sm text-charcoal-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-2xl bg-gold-400 px-8 py-12 text-charcoal-900 shadow-elevated">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Ready to see data that cannot be seen otherwise?
            </h2>
            <p className="mt-3 text-charcoal-800 max-w-lg mx-auto">
              Surface Edition brings Periscope into clear view — so any business unit can look
              through it and access Partner data and cross-team signals that were previously
              invisible.
            </p>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-charcoal-900 px-6 py-3 text-sm font-semibold text-gold-400 hover:bg-charcoal-800 transition"
            >
              Enter Periscope
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-charcoal-100 py-8 text-center text-sm text-charcoal-500">
        Periscope · Surface Edition · Depth Edition (submerged structure) · intelligentmachines
      </footer>
    </div>
  )
}
