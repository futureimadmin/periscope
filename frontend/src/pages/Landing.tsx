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
} from 'lucide-react'

const benefits = [
  {
    icon: Eye,
    title: 'See What Others Can't',
    description:
      'One business unit can look through the Periscope and instantly gain visibility into partnership health, cross-team signals, and opportunities that remain hidden in silos.',
  },
  {
    icon: Layers,
    title: 'Formalise Without Friction',
    description:
      'A scalable framework for formalising and managing partnerships — templates, stages, RACI, success metrics and governance that grow with you, not bureaucracy.',
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
      'AI surfaces hidden opportunities, risks and blind spots that only appear when Sales + Product + Marketing data is combined. Recommendations you can act on immediately.',
  },
  {
    icon: TrendingUp,
    title: 'Accelerate Growth',
    description:
      'Link partnership activity directly to revenue impact, pipeline velocity and market-position indicators. Know which partnerships actually move the needle.',
  },
  {
    icon: ShieldCheck,
    title: 'Drive Customer Satisfaction',
    description:
      'Partner CSAT, relationship strength and operational alignment scores stay visible. Spot at-risk relationships early and intervene before value leaks.',
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
            Bring the invisible into view
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 max-w-3xl mx-auto leading-tight">
            See partnerships the way they{' '}
            <span className="text-holden-600">actually work</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Periscope is the partnership intelligence platform that lets any business unit
            collaborate and look through a shared lens — formalising partnerships,
            accelerating growth, and driving customer satisfaction with AI-powered clarity.
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
              Designed for organisations that treat partnerships as a strategic growth engine,
              not a side conversation.
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
              Ready to surface what others miss?
            </h2>
            <p className="mt-3 text-holden-100 max-w-lg mx-auto">
              The Surface Edition brings Periscope into clear view — so every team can
              collaborate, formalise, and act on the full partnership picture.
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
        Periscope · Surface Edition · intelligentmachines · Powered by Gemini
      </footer>
    </div>
  )
}
