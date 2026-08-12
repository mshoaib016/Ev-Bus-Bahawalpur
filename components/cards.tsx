import { Button } from './ui/button'
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

export function RouteCard({
  id,
  name,
  from,
  to,
  distance,
  duration,
  stops,
  fare,
  frequency,
}: {
  id: string
  name: string
  from: string
  to: string
  distance: string
  duration: string
  stops: number
  fare: string
  frequency: string
}) {
  return (
    <Link href={`/routes/${id}`}>
      <div className="group p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-lg transition cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{from} → {to}</p>
          </div>
          <div className="text-2xl">🚌</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">{distance}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{duration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Stops</p>
              <p className="font-semibold text-foreground">{stops}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-primary">{fare}</span>
            <div>
              <p className="text-xs text-muted-foreground">Frequency</p>
              <p className="font-semibold text-foreground text-sm">{frequency}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm font-medium text-primary">View Details</span>
          <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition" />
        </div>
      </div>
    </Link>
  )
}

export function NewsCard({
  id,
  title,
  category,
  date,
  excerpt,
  image,
}: {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
}) {
  return (
    <Link href={`/news/${id}`}>
      <div className="group overflow-hidden rounded-xl border border-border hover:border-primary hover:shadow-lg transition cursor-pointer h-full">
        <div className="relative overflow-hidden bg-muted h-48">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-light/30 flex items-center justify-center">
            <span className="text-6xl">{image}</span>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
        </div>
        <div className="p-5">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
              {category}
            </span>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary">
            Read More
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-lg transition h-full">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export function FAQCard({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <details className="group bg-white rounded-lg border border-border p-6 open:border-primary open:shadow-lg transition">
      <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
        {question}
        <span className="transition group-open:rotate-180">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </span>
      </summary>
      <p className="text-muted-foreground mt-4">{answer}</p>
    </details>
  )
}

export function StatCard({
  number,
  label,
  icon,
}: {
  number: string
  label: string
  icon: string
}) {
  return (
    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 border border-primary/20">
      <div className="text-5xl mb-3 text-center">{icon}</div>
      <p className="text-4xl font-bold text-primary mb-2">{number}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}
