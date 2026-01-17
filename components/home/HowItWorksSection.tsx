"use client";

interface Step {
  step: string;
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    step: "01",
    title: "Upload Your Assets",
    description:
      "Import SVGs, images, or start with built-in shapes. Drag and drop supported.",
    icon: "hugeicons:upload-02",
  },
  {
    step: "02",
    title: "Compose Layers",
    description:
      "Arrange layers on the canvas. Transform, rotate, and scale elements independently.",
    icon: "hugeicons:layers-01",
  },
  {
    step: "03",
    title: "Apply Effects",
    description:
      "Add shadows, gradients, noise textures, and fine-tune every detail.",
    icon: "hugeicons:paint-board",
  },
  {
    step: "04",
    title: "Export & Ship",
    description:
      "Download all required sizes for iOS and Android. App-store ready.",
    icon: "hugeicons:rocket-01",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 bg-card border-b" id="way">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Go from idea to icon in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-border border-t border-dashed border-foreground/20 z-0" />

          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Step Number Bubble */}
              <div className="w-20 h-20 rounded-2xl bg-background border group-hover:border-primary/50 group-hover:shadow-[0_0_20px_-5px_rgba(0,0,0,0.1)] group-hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center mb-6 shadow-sm">
                <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  0{item.step}
                </span>
              </div>

              {/* Step content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm px-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
