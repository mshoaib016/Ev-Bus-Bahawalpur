"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Leaf, Users, BusFront, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Leaf, title: "Eco Friendly", subtitle: "Zero Emission" },
  { icon: Users, title: "Safe Journey", subtitle: "GPS Tracked" },
  { icon: BusFront, title: "Comfortable", subtitle: "Premium Seats" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const busRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.5,
      })
        .from(
          ".hero-heading-line",
          {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.7,
          },
          "-=0.25",
        )
        .from(".hero-copy", { opacity: 0, y: 20, duration: 0.6 }, "-=0.35")
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 },
          "-=0.3",
        )
        .from(
          ".hero-feature",
          { opacity: 0, y: 14, stagger: 0.1, duration: 0.45 },
          "-=0.25",
        )
        .from(
          ".hero-bus-image",
          {
            opacity: 0,
            x: 60,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.9",
        );

      // Subtle continuous float on the bus once it has landed
      gsap.to(busRef.current, {
        y: -10,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* Left: copy */}
        <div className="order-2 lg:order-1">
          <span className="hero-eyebrow mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Lodhran &rarr; Bahawalpur
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            <span className="hero-heading-line block text-primary">
              Travel Smart
            </span>
            <span className="hero-heading-line block text-foreground">
              Go Green
            </span>
          </h1>

          <p className="hero-copy mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Experience comfortable, safe and eco-friendly travel from Lodhran to
            Bahawalpur with our modern electric bus service.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="hero-cta rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              render={
                <Link href="/routes" className="flex items-center gap-2">
                  View Route
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />

            <Button
              size="lg"
              variant="outline"
              className="hero-cta rounded-full border-border bg-card px-6 text-foreground hover:bg-secondary"
              render={
                <Link href="/live-tracking" className="flex items-center gap-2">
                  Track Bus
                  <BusFront className="h-4 w-4 text-primary" />
                </Link>
              }
            />
          </div>

          {/* Feature strip */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {features.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="hero-feature flex flex-col items-start gap-1"
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                <span className="text-sm font-semibold text-foreground">
                  {title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: bus image */}
        <div
          ref={busRef}
          className="hero-bus-image relative order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-auto lg:h-[420px]"
        >
          <Image
            src="/hero-ev-bus.png"
            alt="Punjab EV Bus travelling on the Bahawalpur route"
            fill
            priority
            className="object-contain"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
