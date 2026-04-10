import Link from "next/link";
import {
  GithubIcon,
  NewTwitterIcon,
  DiscordIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#demo", label: "Demo" },
  { href: "#", label: "Changelog" },
];

const companyLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Press" },
];

const legalLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Cookie Policy" },
];

const socialLinks = [
  { href: "#", icon: GithubIcon, label: "GitHub" },
  { href: "#", icon: NewTwitterIcon, label: "Twitter" },
  { href: "#", icon: DiscordIcon, label: "Discord" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo Column */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-base font-bold text-foreground">
                Kuma Station
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your thinking system.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[13px] text-[#71717a]">
            © 2025 Kuma Station. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#52525b] transition-colors hover:text-primary"
                aria-label={link.label}
              >
                <HugeiconsIcon icon={link.icon} size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
