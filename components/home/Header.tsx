"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X as XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../shared/ModeToggle";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#way" },
  { name: "Results", href: "#results" },
  { name: "Supporters", href: "#supporters" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2">
      <nav
        className={cn(
          "mx-auto w-full max-w-6xl rounded-2xl transition-all duration-300",
          isScrolled
            ? "bg-card/80 border border-border shadow-sm backdrop-blur-md px-4 py-3 max-w-4xl"
            : "px-6 py-4"
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/Pico-icon.png"
                alt="Pico Logo"
                width={36}
                height={36}
                className="relative"
              />
            </div>
            <span className="font-bold text-lg">Pico</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-md font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            <Button
              className={cn(
                "hidden main_button px-4 py-4 text-lg ",
                isScrolled && "flex"
              )}
              onClick={() => router.push("/editor")}
            >
              <ArrowRight className="w-4 h-4" />
              Open Editor
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex items-center justify-center w-12 h-12 lg:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none transition-all duration-1000"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu
              size={24}
              className={
                " transition-all duration-300 " +
                (isMenuOpen ? "opacity-0 blur-lg" : "opacity-100 blur-0")
              }
            />
            <XIcon
              size={24}
              className={
                "absolute transition-all duration-300 " +
                (isMenuOpen ? "opacity-100 blur-0" : "opacity-0 blur-lg")
              }
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-card/80 backdrop-blur-md",
            isMenuOpen ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-default-200">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl font-medium text-muted-foreground hover:text-foreground transition-colors w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-row justify-between items-center gap-3 mt-2">
              <ModeToggle />
              <Button
                className="main_button px-4 py-4 text-lg"
                onClick={() => router.push("/editor")}
              >
                <ArrowRight className="w-4 h-4" />
                Open Editor
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
