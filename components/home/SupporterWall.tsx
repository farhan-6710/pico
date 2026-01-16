"use client";

import { Leaf, Sparkles, Star, Coffee } from "lucide-react";
import { SupportCard } from "./SupportCard";

// Supporter types
interface Supporter {
  name: string;
  avatar?: string;
}

interface SupporterTier {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
  gradient: string;
  supporters: Supporter[];
}

// Sample data - replace with actual supporters data
const supporterTiers: SupporterTier[] = [
  {
    id: "tree-keepers",
    name: "Tree Keepers",
    icon: "hugeicons:tree-05",
    emoji: "🌳",
    color: "text-emerald-500",
    gradient: "from-emerald-500/20 to-green-400/10",
    supporters: [], // Big supporters
  },
  {
    id: "gardeners",
    name: "Gardeners",
    icon: "hugeicons:plant-03",
    emoji: "🌿",
    color: "text-green-400",
    gradient: "from-green-400/20 to-lime-400/10",
    supporters: [], // Medium supporters
  },
  {
    id: "seed-planters",
    name: "Seed Planters",
    icon: "hugeicons:leaf-01",
    emoji: "✨",
    color: "text-lime-400",
    gradient: "from-lime-400/20 to-yellow-400/10",
    supporters: [], // Small supporters
  },
];

// Generate initials from name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Supporter Avatar Component
const SupporterAvatar = ({
  supporter,
  size = "md",
  tier,
}: {
  supporter: Supporter;
  size?: "sm" | "md" | "lg";
  tier: SupporterTier;
}) => {
  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-base",
  };

  return (
    <div className="group relative flex flex-col items-center gap-2">
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-2 bg-linear-to-br ${tier.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
      />

      {/* Avatar */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full bg-linear-to-br from-card to-secondary border-2 border-border group-hover:border-primary/30 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105`}
      >
        {supporter.avatar ? (
          <img
            src={supporter.avatar}
            alt={supporter.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold text-muted-foreground">
            {getInitials(supporter.name)}
          </span>
        )}
      </div>

      {/* Name tooltip on hover */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border border-border rounded-lg text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-10">
        {supporter.name}
      </div>
    </div>
  );
};

// Tier Section Component
const TierSection = ({ tier }: { tier: SupporterTier }) => {
  if (tier.supporters.length === 0) return null;

  return (
    <div className="relative">
      {/* Tier header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-2 rounded-xl bg-linear-to-br ${tier.gradient} border border-border`}
        >
          <Leaf className={`w-5 h-5 ${tier.color}`} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            {tier.name} {tier.emoji}
          </h3>
          <p className="text-xs text-muted-foreground">
            {tier.supporters.length} supporter
            {tier.supporters.length !== 1 && "s"}
          </p>
        </div>
      </div>

      {/* Supporters grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {tier.supporters.map((supporter, index) => (
          <div
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <SupporterAvatar
              supporter={supporter}
              size={
                tier.id === "tree-keepers"
                  ? "lg"
                  : tier.id === "gardeners"
                  ? "md"
                  : "sm"
              }
              tier={tier}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
      {/* Decorative illustration */}
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-linear-to-br from-accent-soft-hover to-emerald-500/10 rounded-full blur-2xl animate-float-slow" />
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative">
            {/* Planting animation */}
            <Leaf className="w-16 h-16 text-primary/40 animate-float" />
            {/* Sparkles */}
            <div className="absolute -top-2 -right-2 animate-float-delayed">
              <Sparkles className="w-6 h-6 text-primary/30" />
            </div>
            <div className="absolute -bottom-1 -left-3 animate-float">
              <Sparkles className="w-4 h-4 text-emerald-400/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-base-content">
          Be the First Seed Planter! 🌱
        </h3>
        <p className="text-sm text-base-content/60">
          Our supporter wall is waiting for its first names. Your support helps
          Pico grow and flourish.
        </p>
      </div>

      {/* Support Card */}
      <div className="w-full">
        <SupportCard buttonAction={() => {}} />
      </div>
    </div>
  );
};

export const SupporterWall = () => {
  // Check if there are any supporters
  const hasAnySupporters = supporterTiers.some(
    (tier) => tier.supporters.length > 0
  );

  return (
    <section
      className="relative py-24 px-6 overflow-hidden bg-base-100"
      id="supporters"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-float-delayed" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--base-300) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium">
            <Star className="w-4 h-4" />
            Pico Supporters
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Our Growing Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These amazing people help keep Pico free, ad-free, and growing.
            Thank you! 💚
          </p>
        </div>

        {/* Content */}
        {hasAnySupporters ? (
          <div className="space-y-16">
            {supporterTiers.map((tier) => (
              <TierSection key={tier.id} tier={tier} />
            ))}

            {/* Call to action */}
            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-base-content/40 mb-4">
                Want to see your name here?
              </p>
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-t from-[#5a9a46] to-[#a8d095] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                <Coffee className="w-5 h-5" />
                Support Pico
              </a>
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};
