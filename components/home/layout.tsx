import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pico - Create Beautiful App Icons with Ease",
  description:
    "Professional icon editor for creating stunning iOS and Android app icons. Layer-based editing, real-time preview, and one-click export.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-300">
      {children}
    </div>
  );
}
