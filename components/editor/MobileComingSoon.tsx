"use client";

import Link from "next/link";
import { Monitor, Check, Home, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileComingSoon = () => {
  return (
    <div className="fixed inset-0 z-5000 flex lg:hidden items-center justify-center bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted to-background" />

      {/* Animated decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-emerald-500/15 rounded-full blur-3xl animate-float" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 space-y-8 animate-fade-in-up max-w-md mx-auto">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl scale-150" />
            <div className="relative w-24 h-24 bg-linear-to-br from-secondary to-emerald-500/20 border border-primary/30 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <Monitor className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-medium text-primary">Desktop Only</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">
              Coming Soon
            </span>
            <span className="block mt-2 text-2xl text-foreground/80">
              to Mobile
            </span>
          </h1>

          <p className="text-base text-foreground/60 leading-relaxed">
            Our editor is currently optimized for desktop experiences. Mobile
            support is on the way!
          </p>
        </div>

        {/* Features teaser */}
        <div className="flex flex-col gap-3 text-sm text-foreground/50">
          <div className="flex items-center gap-3 justify-center">
            <Check className="w-4 h-4 text-primary" />
            <span>Layer-based editing</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Check className="w-4 h-4 text-primary" />
            <span>Real-time preview</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Check className="w-4 h-4 text-primary" />
            <span>One-click export</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 space-y-4">
          <Link href="/">
            <Button
              size="lg"
              className="bg-linear-to-t from-[#5a9a46] to-[#a8d095] text-white font-semibold px-8 w-full"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>

          <p className="text-xs text-foreground/40 flex items-center gap-2 justify-center mt-4">
            <Laptop className="w-4 h-4" />
            Open on desktop for the full experience
          </p>
        </div>
      </div>
    </div>
  );
};
