import siteConfig from "@/lib/site.config"

/** Intended Vela mailboxes. Not live until DNS and mail routing are pointed. */
export const EMAILS_PENDING_DNS = true

export const contactEmail =
  siteConfig.seo.contactEmail ?? "hello@vela.io"

export const privacyEmail =
  siteConfig.seo.privacyEmail ?? siteConfig.seo.contactEmail ?? "privacy@vela.io"

export const PENDING_DNS_NOTE =
  "These addresses are intended for Vela but are not live yet (pending DNS). The vela.io domain and mailboxes have not been purchased or pointed. Do not send mail expecting delivery until that setup is complete."
