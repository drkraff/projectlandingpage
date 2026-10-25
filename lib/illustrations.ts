/** Line-art marketing images. Transparent art sits on the #111111 page.
 *  App screens in public/illustrations/app stay unused here.
 *  The hero demo is separate; quote-before-after uses the same line-art set. */

export const howItWorksPanels = [
  {
    src: "/illustrations/how-it-works-talk.webp",
    width: 2048,
    height: 1536,
    caption: "Talk: describe the job in a voice note",
    alt: "Talk: describe the job in a voice note",
  },
  {
    src: "/illustrations/how-it-works-review.webp",
    width: 2048,
    height: 1536,
    caption: "Review: Vela turns it into an itemized quote",
    alt: "Review: Vela turns it into an itemized quote",
  },
  {
    src: "/illustrations/how-it-works-send.webp",
    width: 2048,
    height: 1536,
    caption: "Send: text, WhatsApp or email it to the customer",
    alt: "Send: text, WhatsApp or email it to the customer",
  },
] as const

export const quoteBeforeAfter = {
  src: "/illustrations/quote-before-after.webp",
  width: 2048,
  height: 847,
  alt: "Messy paper estimates turned into one clean quote",
} as const

export const waitlistJoined = {
  src: "/illustrations/waitlist-joined.webp",
  width: 2048,
  height: 2147,
} as const

export const trades = [
  {
    id: "electrician",
    name: "Electrician",
    label: "Electricians",
    src: "/illustrations/icon-electrician.svg",
    width: 24,
    height: 24,
  },
  {
    id: "plumber",
    name: "Plumber",
    label: "Plumbers",
    src: "/illustrations/icon-plumber.svg",
    width: 24,
    height: 24,
  },
  {
    id: "handyman",
    name: "Handyman",
    label: "Handymen",
    src: "/illustrations/icon-handyman.svg",
    width: 24,
    height: 24,
  },
] as const

export type TradeId = (typeof trades)[number]["id"]

export function tradeById(id: TradeId) {
  const trade = trades.find((item) => item.id === id)
  if (!trade) throw new Error(`Unknown trade: ${id}`)
  return trade
}

/** FAQ answers that name the trades and should show the icons beside those labels. */
export function answerShowsTrades(question: string) {
  return question === "Who’s it for?" || question === "Is it just for electricians?"
}
