import { Header } from "@/components/layout/header"
import { FooterSection } from "@/components/sections/footer-section"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-36 md:px-8">{children}</main>
      <FooterSection />
    </>
  )
}
