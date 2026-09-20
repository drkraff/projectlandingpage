import type { Metadata } from "next"
import siteConfig from "@/lib/site.config"
import { privacyEmail, PENDING_DNS_NOTE, EMAILS_PENDING_DNS } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

const updated = "September 20, 2026"
const company = siteConfig.seo.siteName

export default function PrivacyPage() {
  return (
    <article className="prose-legal">
      <span className="label-editorial mb-6 block">Legal</span>
      <h1 className="font-heading text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 font-sans text-sm text-muted-foreground">
        Last updated: {updated}
      </p>

      <div className="rule-editorial my-10" />

      <Section title="1. Who we are">
        <p>
          This policy covers the Vela waitlist website. Vela is a pre-MVP product. This site
          collects waitlist interest only — it is not a live quoting product and we do not operate
          user accounts yet.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>
          We collect the email address you type into the waitlist form. That is the only personal
          information we ask for. We do not collect your name, phone number, or street address, and
          we do not have a public street address to publish.
        </p>
        <p>
          If you consent to analytics cookies, we also receive anonymised usage data (pages viewed
          and similar events) from Vercel Analytics.
        </p>
      </Section>

      <Section title="3. How we use your information">
        <p>
          Email only. We’ll write when Vela is ready to try — nothing else. We do not use waitlist
          addresses for unrelated marketing.
        </p>
      </Section>

      <Section title="4. Sharing your information">
        <p>
          We do not sell your personal data. Waitlist emails are stored with our database provider
          (Supabase) so we can send the one “ready to try” message. If you accept analytics cookies,
          Vercel processes anonymised usage data. We may disclose information if required by law.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          We use cookies and similar technologies to remember your cookie preference and, with your
          consent, to collect analytics data. See our{" "}
          <a href="/cookies" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Cookie Policy
          </a>{" "}
          for details.
        </p>
      </Section>

      <Section title="6. Data retention">
        <p>
          We keep your email until we notify you that Vela is ready to try, you ask us to delete it,
          or the waitlist is closed — whichever comes first.
        </p>
      </Section>

      <Section title="7. Your rights">
        <p>
          Depending on your location, you may have the right to access, correct, or delete your
          personal data. To exercise these rights, contact us at the address below when that mailbox
          is live.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We take reasonable technical and organisational measures to protect waitlist emails. No
          method of transmission over the internet is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </Section>

      <Section title="9. Changes to this policy">
        <p>
          We may update this policy from time to time. We will post the new policy on this page and
          update the date above.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions about this policy? {company}’s intended privacy address is{" "}
          <a href={`mailto:${privacyEmail}`} className="underline underline-offset-2 hover:text-foreground transition-colors">
            {privacyEmail}
          </a>
          .
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
