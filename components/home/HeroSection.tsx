"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Zap, Sparkles, Layers, CloudOff } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { useRouter } from "next/navigation";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden bg-card">
      <div
        className="absolute inset-0 canvas-grid opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--base-300) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block pointer-events-none"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <section>
        <div className="relative pt-24 md:pt-36">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 1,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.3,
                    duration: 2,
                  },
                },
              },
            }}
            className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32 pointer-events-none"
          >
            <div className="hidden size-full dark:block absolute inset-0 bg-linear-to-b from-background/5 to-background" />
          </AnimatedGroup>

          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)] pointer-events-none"
          />

          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <Badge
                variant="secondary"
                className="shadow-md text-lg py-2 px-4 rounded-full inline-flex items-center gap-2"
              >
                <Zap className="size-4" />
                <div className="w-px h-3 mx-1 bg-muted-foreground rounded-full" />
                Early Beta
              </Badge>
              <div className="flex flex-col gap-0 text-center">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:mt-16 xl:text-7xl font-inter leading-tight"
                >
                  Create Beautiful App
                </TextEffect>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto max-w-4xl text-balance text-5xl font-bold tracking-tight text-primary font-inter md:text-7xl xl:text-7xl leading-tight"
                >
                  Icons with Ease
                </TextEffect>
              </div>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-4 max-w-2xl text-balance text-lg text-foreground"
              >
                Professional icon editor with layer-based editing, real-time
                preview, and one-click export for iOS and Android.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-8 flex flex-col items-center justify-center gap-2 md:flex-row"
              >
                <Button
                  onClick={() => router.push("/editor")}
                  size="lg"
                  className="main_button px-6 py-4 text-lg"
                >
                  Open Editor
                </Button>
                <p className="mt-4 md:mt-0 text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  No signup required
                </p>
              </AnimatedGroup>
              <div className="w-full mt-4 sm:mt-8 flex flex-row justify-center gap-4 opacity-50">
                {/* Replaced Customers with Features to match context */}
                <div className="flex flex-col items-center gap-2">
                  <Layers className="size-4" />
                  <span className="text-xs font-medium">Layer-based</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Zap className="size-4" />
                  <span className="text-xs font-medium">Real-time</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CloudOff className="size-4" />
                  <span className="text-xs font-medium">Instant Export</span>
                </div>
              </div>
            </div>
          </div>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
                hidden: {
                  opacity: 0,
                  y: 20,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="mask-b-from-55% relative mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-16">
              <div className="inset-shadow-2xs dark:inset-shadow-white/20 bg-base-200/20 relative mx-auto max-w-6xl overflow-hidden rounded-3xl border p-2 shadow-lg shadow-zinc-950/15">
                <Image
                  className="bg-base-100 aspect-15/8 relative hidden rounded-2xl dark:block border border-base-300"
                  src="/layouts/dark-layout.png"
                  alt="app screen"
                  width="2700"
                  height="1440"
                />
                <Image
                  className="z-2 border-base-300/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                  src="/layouts/white-layout.png"
                  alt="app screen"
                  width="2700"
                  height="1440"
                />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}
