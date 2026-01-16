"use client";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-lg text-foreground tracking-tight">
            Pico
          </span>
          <p className="text-sm text-muted-foreground mt-1">
            Professional app icon editor for everyone.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-muted-foreground font-medium">
          {/* Placeholder links if needed, or just copyright */}
          <span>© {new Date().getFullYear()} Pico</span>
          <Link
            href="https://farhan-dev-three.vercel.app/"
            target="_blank"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            By Farhan Ahmed
            <ExternalLink className="size-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
