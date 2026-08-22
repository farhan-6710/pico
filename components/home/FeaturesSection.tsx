"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const features = [
  {
    title: "Layer-Based Editing",
    description:
      "Create complex icons with independent layers. Each layer has its own transforms, effects, and blend modes.",
    lightImage: "/binto/w-Frame 2.png",
    darkImage: "/binto/Frame 2.png",
  },
  {
    title: "One-Click Export",
    description:
      "Export all required sizes and formats instantly with just one click, so easy, too powerful.",
    lightImage: "/binto/w-Frame 3.png",
    darkImage: "/binto/Frame 3.png",
  },
  {
    title: "Result Preview",
    description: "Preview your icon in ios and anroid styles before export it.",
    lightImage: "/binto/w-Frame 4.png",
    darkImage: "/binto/Frame 4.png",
  },
];

export const FeaturesSection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative h-fit py-24 px-6 bg-background border" id="features">
      {/* Circuit Board - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto z-1000">
        <div className="text-center mb-16 space-y-4 z-1000">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto z-1000">
            Powerful tools wrapped in a beautiful, easy-to-use interface.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-card border border-border overflow-hidden w-full h-full flex flex-col items-center justify-center gap-2 rounded-3xl transition-all duration-300 shadow-2xl hover:border-primary hover:scale-105 hover:shadow-[20px_30px_40px_-15px_color-mix(in_srgb,var(--primary),transparent_70%)] z-10"
            >
              <Image
                src={isDark ? feature.darkImage : feature.lightImage}
                alt={feature.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
              <div className="w-full flex flex-col gap-2 p-6 mb-2">
                <h3 className="text-2xl font-bold text-card-foreground tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
