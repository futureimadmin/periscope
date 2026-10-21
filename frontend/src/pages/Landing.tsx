import { Link } from 'react-router-dom'
import {
  Telescope,
  Eye,
  Layers,
  Users,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Database,
} from 'lucide-react'

const benefits = [
  {
    icon: Eye,
    title: 'See Data That Cannot Be Seen Otherwise',
    description:
      'One business unit can look through the Periscope and gain visibility into Partner data and other business units\' data \u2014 information that is normally locked behind silos.',
  },
  {
    icon: Database,
    title: 'Partner + Cross-BU Visibility',
    description:
      'Sales can see Product roadmap signals. Marketing can see Development capacity. Product can see pipeline intent. Everyone can see relevant Partner data in context.',
  },
  {
    icon: Layers,
    title: 'Formalise Without Friction',
    description:
      'A scalable framework for formalising and managing partnerships \u2014 templates, stages, RACI, success metrics and governance that grow with you, not bureaucracy.',
  },
  {
    icon: Users,
    title: 'True Cross-Team Collaboration',
    description:
      'Sales, Marketing, Product and Development work on a shared partnership canvas. Raise signals, log decisions, and keep everyone aligned in real time.',
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
      'Link partnership activity to revenue impact, pipeline velocity, market position and Partner CSAT. Act on what was previously invisible.',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Nav */}
      <header className="border-b border-charcoal-100 bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-holden-500 text-white">
              <Telescope className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <span className="font-display text-lg font-bold text-charcoal-900">Periscope</span>
            <span className="ml-2 rounded-full bg-holden-100 px-2.5 py-0.5 text-xs font-medium text-holden-700">
              Surface Edition
            </span>
          </div>
          <Link to="/app" className="btn-primary">
            Open Periscope
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-holden-100 px-4 py-1.5 text-sm font-medium text-holden-800 mb-6">
            <Telescope className="h-4 w-4" />
            See things that cannot be seen otherwise
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 max-w-3xl mx-auto leading-tight">
            Look through the Periscope and see{' '}
            <span className="text-holden-600">Partner & cross-team data</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Periscope is the partnership intelligence platform that lets any business unit
            collaborate and gain visibility into Partner data and other business units\' data
            \u2014 information that is normally invisible due to organisational silos.
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

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-white border-y border-charcoal-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-charcoal-900">
              Benefits of using Periscope
            </h2>
            <p className="mt-3 text-charcoal-600 max-w-xl mx-auto">
              Designed so that one team can look through the Periscope and finally see
              Partner data and other business units\' data that was previously out of reach.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card hover:shadow-elevated transition-shadow duration-200"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-holden-50 text-holden-600 mb-4">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900">{title}</h3>
                <p className="mt-2 text-sm text-charcoal-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="rounded-2xl bg-holden-500 px-8 py-12 text-white shadow-elevated">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Ready to see data that cannot be seen otherwise?
            </h2>
            <p className="mt-3 text-holden-100 max-w-lg mx-auto">
              The Surface Edition brings Periscope into clear view \u2014 so any business unit
              can look through it and access Partner data and cross-team signals that were
              previously invisible.
            </p>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-holden-700 hover:bg-cream-50 transition"
            >
              Enter Periscope
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-charcoal-100 py-8 text-center text-sm text-charcoal-500">
        Periscope \u00b7 Surface Edition \u00b7 intelligentmachines \u00b7 Powered by Gemini
      </footer>
    </div>
  )
}
