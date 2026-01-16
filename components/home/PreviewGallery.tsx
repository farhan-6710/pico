"use client";

import Image from "next/image";
import { Sparkles, Lock, Layers, Palette } from "lucide-react";

const sampleIcons = [
  { gradient: "from-pink-500 to-rose-300", image: "/icons/icon(1).png" },
  { gradient: "from-green-500 to-cyan-500", image: "/icons/icon(2).png" },
  { gradient: "from-cyan-200 to-emerald-500", image: "/icons/icon(3).png" },
  { gradient: "from-gray-500 to-zinc-300", image: "/icons/icon(4).png" },
  { gradient: "from-red-500 to-orange-500", image: "/icons/icon(5).png" },
  { gradient: "from-pink-500 to-rose-300", image: "/icons/icon(6).png" },
];

export const PreviewGallery = () => {
  return (
    <section
      className="relative py-24 px-6 bg-background overflow-hidden"
      id="results"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            Beautiful Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Create Icons Like These
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pixel-perfect icons that look great on any device.
          </p>
        </div>

        {/* Icon gallery */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {sampleIcons.map((item, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect */}
              <div
                className={`absolute -inset-2 bg-linear-to-br ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />
              <Image
                src={item.image}
                alt="Icon"
                width={100}
                height={100}
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* App preview section */}
        <div className="relative">
          <div className="relative bg-background border border-border rounded-3xl shadow-2xl overflow-hidden">
            {/* Mock browser chrome */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-card rounded-lg text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  Pico.app/editor
                </div>
              </div>
            </div>

            {/* Editor interface preview */}
            <div className="relative aspect-video bg-card rounded-b-2xl overflow-hidden">
              {/* Layer sidebar mock */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-background border-r border-border p-2 space-y-2">
                <div className="h-8 bg-card rounded-lg" />
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg ${
                      i === 2
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-card"
                    }`}
                  />
                ))}
              </div>

              {/* Canvas area with icon */}
              <div className="absolute left-16 sm:left-24 right-0 sm:right-56 top-0 bottom-0 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-48 sm:h-48 shadow-xl flex items-center justify-center animate-float-slow rounded-[100px]">
                  <Image
                    src="/Pico-icon.png"
                    alt="Pico Icon"
                    width={80}
                    height={80}
                    className="opacity-90 w-full h-full object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Right panel mock */}
              <div className="absolute right-0 top-0 bottom-0 w-0 sm:w-56 bg-background border-l border-border p-4 space-y-4 hidden sm:flex sm:flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-card rounded w-1/2" />
                  <div className="h-10 bg-card rounded" />
                  <div className="h-4 bg-card rounded w-2/3" />
                  <div className="h-10 bg-card rounded" />
                  <div className="h-4 bg-card rounded w-1/3" />
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded ${
                          i === 3 ? "bg-primary" : "bg-card"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-base-300">
                  <div className="text-xs text-base-content/40 mb-2 self-end">
                    Preview
                  </div>
                  <div className="w-full justify-between flex gap-2 px-6">
                    <div className="w-12 h-12 rounded-xl bg-primary" />
                    <div className="w-12 h-12 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating labels */}
          <div className="absolute -left-4 top-1/4 bg-background border border-border rounded-lg px-3 py-2 shadow-lg hidden lg:flex items-center gap-2 animate-float">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Layers Panel</span>
          </div>
          <div className="absolute -right-4 top-1/3 bg-background border border-border rounded-lg px-3 py-2 shadow-lg hidden lg:flex items-center gap-2 animate-float">
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Edit Tools</span>
          </div>
        </div>
      </div>
    </section>
  );
};
