import type { Metadata } from "next"
import siteConfig from "@/lib/site.config"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

const updated = "March 22, 2026"
const company = siteConfig.seo.siteName
const email = "privacy@acme.com"

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

      <Section title="1. Information We Collect">
        <p>
          We collect information you provide directly to us, such as your email address when you
          join our waitlist or create an account. We also collect usage data automatically when you
          interact with our services, including pages visited, actions taken, and device information.
        </p>
      </Section>

      <Section title="2. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate and improve our services</li>
          <li>Send you product updates and announcements (with your consent)</li>
          <li>Respond to your questions and support requests</li>
          <li>Analyse usage patterns to improve the user experience</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>

      <Section title="3. Sharing Your Information">
        <p>
          We do not sell your personal data. We may share information with trusted third-party
          service providers who assist us in operating our services (e.g. analytics, email
          delivery), subject to confidentiality agreements. We may disclose information if required
          by law or to protect our legal rights.
        </p>
      </Section>

      <Section title="4. Cookies">
        <p>
          We use cookies and similar technologies to operate our services and, with your consent,
          to collect analytics data. You can control cookie preferences through our cookie consent
          banner or your browser settings. See our{" "}
          <a href="/cookies" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Cookie Policy
          </a>{" "}
          for details.
        </p>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We retain your personal data for as long as necessary to provide our services and comply
          with legal obligations. You may request deletion of your data at any time by contacting us.
        </p>
      </Section>

      <Section title="6. Your Rights">
        <p>
          Depending on your location, you may have the right to access, correct, or delete your
          personal data, restrict or object to its processing, and request data portability. To
          exercise these rights, contact us at{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-2 hover:text-foreground transition-colors">
            {email}
          </a>
          .
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We take reasonable technical and organisational measures to protect your information
          against unauthorised access, loss, or misuse. No method of transmission over the internet
          is completely secure, however, and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="8. Changes to This Policy">
        <p>
          We may update this policy from time to time. We will notify you of significant changes by
          posting the new policy on this page and updating the date above. Continued use of our
          services after changes constitutes acceptance.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          Questions about this policy? Contact {company} at{" "}
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
