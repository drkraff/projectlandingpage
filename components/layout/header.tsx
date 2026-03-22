"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import siteConfig from "@/lib/site.config"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const { name } = siteConfig.sections.footer.brand
  const ctaLabel = siteConfig.sections.hero.primaryCta.label

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close on Escape + focus trap
  useEffect(() => {
    if (!menuOpen) return

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); return }
      if (e.key !== "Tab" || !focusable?.length) return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between border-b px-6 py-4 backdrop-blur-md transition-all duration-200 md:px-12 lg:px-20 ${
            scrolled
              ? "border-border/60 bg-background/95 shadow-sm"
              : "border-border/40 bg-background/90"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="font-heading text-xl tracking-tight text-foreground transition-opacity duration-200 hover:opacity-60"
          >
            {name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground transition-all duration-200 hover:tracking-[0.2em] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden cursor-pointer bg-primary text-primary-foreground transition-colors hover:bg-primary/85 md:inline-flex"
            >
              <Link href="#waitlist">{ctaLabel}</Link>
            </Button>

            {/* Hamburger — mobile only */}
            <button
              className="flex cursor-pointer items-center justify-center rounded-none p-1 text-foreground transition-opacity duration-150 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {/* Backdrop */}
      <div
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-border bg-background transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <span className="font-heading text-lg tracking-tight">{name}</span>
          <button
            className="flex cursor-pointer items-center justify-center p-1 text-muted-foreground transition-opacity duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-6" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground py-3 border-b border-border/40 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-auto p-6">
          <Button
            asChild
            className="w-full cursor-pointer bg-primary text-primary-foreground transition-colors hover:bg-primary/85"
          >
            <Link href="#waitlist" onClick={() => setMenuOpen(false)}>
              {ctaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
