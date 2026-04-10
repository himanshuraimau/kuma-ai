"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#demo", label: "Demo" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-1/2 top-6 z-[9999] -translate-x-1/2 transition-all duration-300 animate-fade-up",
        "rounded-full px-5 py-2 md:px-2 md:py-2 md:pl-5",
        "min-w-fit max-w-[90vw] md:min-w-[700px]",
        scrolled ? "glass-navbar-scrolled" : "glass-navbar",
      )}
    >
      <div className="flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-base font-bold text-foreground">
            Kuma Station
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-background hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(249,115,22,0.4)]"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <HugeiconsIcon
            icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
            size={24}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mt-4 md:hidden glass-card rounded-2xl p-4 animate-fade-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 w-full rounded-full bg-primary text-sm font-semibold text-background"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
