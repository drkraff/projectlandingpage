import type { Metadata } from "next"
import { privacyEmail, PENDING_DNS_NOTE, EMAILS_PENDING_DNS } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Cookie Policy",
}

const updated = "September 20, 2026"

export default function CookiesPage() {
  return (
    <article className="prose-legal">
      <span className="label-editorial mb-6 block">Legal</span>
      <h1 className="font-heading text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl">
        Cookie Policy
      </h1>
      <p className="mt-4 font-sans text-sm text-muted-foreground">
        Last updated: {updated}
      </p>

      <div className="rule-editorial my-10" />

      <Section title="1. What are cookies">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help
          websites remember your preferences, understand how you use the site, and improve your
          experience over time.
        </p>
      </Section>

      <Section title="2. Cookies we use">
        <p>This waitlist site uses the following categories of cookies:</p>
        <ul>
          <li>
            <strong>Strictly necessary</strong> — Required for the site to function. These cannot
            be disabled (e.g. remembering your cookie consent preference).
          </li>
          <li>
            <strong>Analytics</strong> — Help us understand how visitors interact with the site.
            We use Vercel Analytics, which collects anonymised page view and event data. These are
            only set with your consent.
          </li>
        </ul>
      </Section>

      <Section title="3. Your choices">
        <p>
          When you first visit our site, a banner asks for your consent to analytics cookies. You
          can accept or decline. Your choice is stored in your browser’s local storage under the key{" "}
          <code className="rounded-none bg-muted px-1 py-0.5 font-mono text-xs">
            cookie-consent
          </code>
          .
        </p>
        <p>
          You can change your preference at any time by clearing your browser’s local storage for
          this site, which will cause the banner to reappear on your next visit.
        </p>
      </Section>

      <Section title="4. Third-party services">
        <p>
          We use Vercel Analytics to collect anonymised usage data. Vercel may store cookies or
          similar identifiers on your device. For details, see{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Vercel’s Privacy Policy
          </a>
          .
        </p>
      </Section>

      <Section title="5. Browser controls">
        <p>
          Most browsers allow you to refuse or delete cookies through their settings. Note that
          disabling cookies may affect the functionality of some parts of our site.
        </p>
      </Section>

      <Section title="6. Changes to this policy">
        <p>
          We may update this Cookie Policy from time to time. Changes will be posted on this page
          with an updated date.
        </p>
      </Section>

      <Section title="7. Contact">
        <p>
          Questions about our use of cookies? Vela’s intended privacy address is{" "}
          <a
            href={`mailto:${privacyEmail}`}
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
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
      <div className="font-sans text-sm leading-relaxed text-foreground/80 [&_a]:text-foreground [&_code]:text-foreground [&_li]:mb-1 [&_p+p]:mt-3 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}
