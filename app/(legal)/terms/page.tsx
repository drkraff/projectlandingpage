import type { Metadata } from "next"
import siteConfig from "@/lib/site.config"
import { contactEmail, privacyEmail, PENDING_DNS_NOTE, EMAILS_PENDING_DNS } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: {
    canonical: `${siteConfig.seo.canonicalUrl}/terms`,
  },
}

const updated = "September 20, 2026"
const company = siteConfig.seo.siteName

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

      <Section title="1. What this site is">
        <p>
          This website is a pre-MVP waitlist for {company}. It is not a live quoting product. By
          using this site or joining the waitlist, you agree to these Terms. If you do not agree, do
          not use the site.
        </p>
      </Section>

      <Section title="2. Waitlist">
        <p>
          Joining the waitlist is email-only. We will write when Vela is ready to try — nothing
          else. Submitting an email does not create an account, a contract for paid services, or a
          guaranteed launch date or price.
        </p>
      </Section>

      <Section title="3. Acceptable use">
        <p>You agree not to use this site:</p>
        <ul>
          <li>In any way that violates applicable laws or regulations</li>
          <li>To transmit unsolicited or unauthorised advertising or promotional material</li>
          <li>To impersonate any person or entity</li>
          <li>To interfere with or disrupt the integrity of our services</li>
        </ul>
      </Section>

      <Section title="4. Intellectual property">
        <p>
          All content, features, and branding on this site are owned by {company} and are protected
          by applicable intellectual property laws. You may not copy, modify, distribute, or create
          derivative works without our express written permission.
        </p>
      </Section>

      <Section title="5. Disclaimer of warranties">
        <p>
          This waitlist site is provided “as is” and “as available” without warranties of any kind,
          express or implied. We do not warrant that the site will be uninterrupted or error-free.
        </p>
      </Section>

      <Section title="6. Limitation of liability">
        <p>
          To the fullest extent permitted by law, {company} shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from your use of, or
          inability to use, this site.
        </p>
      </Section>

      <Section title="7. Changes">
        <p>
          We may modify these Terms at any time by updating this page. Continued use of the site
          after changes constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>
          Questions about these Terms? {company}’s intended contact addresses are{" "}
          <a href={`mailto:${contactEmail}`} className="underline underline-offset-2 hover:text-foreground transition-colors">
            {contactEmail}
          </a>
          {" "}and{" "}
          <a href={`mailto:${privacyEmail}`} className="underline underline-offset-2 hover:text-foreground transition-colors">
            {privacyEmail}
          </a>
          . Mailboxes are pending DNS. We do not publish a street address.
        </p>
        {EMAILS_PENDING_DNS && <p>{PENDING_DNS_NOTE}</p>}
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
