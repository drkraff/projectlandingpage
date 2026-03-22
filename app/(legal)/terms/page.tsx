import type { Metadata } from "next"
import siteConfig from "@/lib/site.config"

export const metadata: Metadata = {
  title: "Terms of Service",
}

const updated = "March 22, 2026"
const company = siteConfig.seo.siteName
const email = "legal@acme.com"

export default function TermsPage() {
  return (
    <article className="prose-legal">
      <span className="label-editorial mb-6 block">Legal</span>
      <h1 className="font-heading text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 font-sans text-sm text-muted-foreground">
        Last updated: {updated}
      </p>

      <div className="rule-editorial my-10" />

      <Section title="1. Acceptance of Terms">
        <p>
          By accessing or using {company}'s services, you agree to be bound by these Terms of
          Service. If you do not agree, do not use our services.
        </p>
      </Section>

      <Section title="2. Use of Services">
        <p>
          You may use our services only for lawful purposes and in accordance with these Terms. You
          agree not to use our services:
        </p>
        <ul>
          <li>In any way that violates applicable laws or regulations</li>
          <li>To transmit unsolicited or unauthorised advertising or promotional material</li>
          <li>To impersonate any person or entity</li>
          <li>To interfere with or disrupt the integrity of our services</li>
        </ul>
      </Section>

      <Section title="3. Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and
          for all activities that occur under your account. Notify us immediately at{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-2 hover:text-foreground transition-colors">
            {email}
          </a>{" "}
          if you suspect unauthorised access.
        </p>
      </Section>

      <Section title="4. Intellectual Property">
        <p>
          All content, features, and functionality of our services are owned by {company} and are
          protected by applicable intellectual property laws. You may not copy, modify, distribute,
          or create derivative works without our express written permission.
        </p>
      </Section>

      <Section title="5. Disclaimer of Warranties">
        <p>
          Our services are provided "as is" and "as available" without warranties of any kind,
          express or implied. We do not warrant that our services will be uninterrupted, error-free,
          or free of viruses or other harmful components.
        </p>
      </Section>

      <Section title="6. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, {company} shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from your use of, or
          inability to use, our services.
        </p>
      </Section>

      <Section title="7. Termination">
        <p>
          We reserve the right to suspend or terminate your access to our services at any time, with
          or without cause, and with or without notice. Upon termination, your right to use the
          services ceases immediately.
        </p>
      </Section>

      <Section title="8. Changes to Terms">
        <p>
          We may modify these Terms at any time. We will notify you of material changes by updating
          the date above. Continued use of our services after changes constitutes acceptance of the
          revised Terms.
        </p>
      </Section>

      <Section title="9. Governing Law">
        <p>
          These Terms are governed by and construed in accordance with applicable law. Any disputes
          shall be resolved exclusively in the courts of competent jurisdiction.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions about these Terms? Contact us at{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-2 hover:text-foreground transition-colors">
            {email}
          </a>
          .
        </p>
      </Section>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h2>
      <div className="font-sans text-sm leading-relaxed text-foreground/80 [&_a]:text-foreground [&_li]:mb-1 [&_p+p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}
