/** Cropped marketing art. App screens in public/illustrations/app stay unused here. */

export const howItWorksPanels = [
  {
    src: "/illustrations/how-it-works-talk.webp",
    width: 376,
    height: 457,
    caption: "Talk: describe the job in a voice note",
    alt: "Contractor describing a job in a voice note",
  },
  {
    src: "/illustrations/how-it-works-review.webp",
    width: 376,
    height: 457,
    caption: "Review: Vela turns it into an itemized quote",
    alt: "Hand holding an itemized quote ready to review",
  },
  {
    src: "/illustrations/how-it-works-send.webp",
    width: 376,
    height: 457,
    caption: "Send: text, WhatsApp or email it to the customer",
    alt: "Quote sent to the customer and marked approved",
  },
] as const

export const quoteBeforeAfter = {
  src: "/illustrations/quote-before-after.webp",
  width: 1168,
  height: 784,
  alt: "Messy paper notes turned into a clean, approved quote",
} as const

export const waitlistJoined = {
  src: "/illustrations/waitlist-joined.webp",
  width: 784,
  height: 1168,
} as const

export const trades = [
  {
    id: "electrician",
    name: "Electrician",
    label: "Electricians",
    src: "/illustrations/icon-electrician.webp",
    width: 512,
    height: 512,
  },
  {
    id: "plumber",
    name: "Plumber",
    label: "Plumbers",
    src: "/illustrations/icon-plumber.webp",
    width: 512,
    height: 512,
  },
  {
    id: "handyman",
    name: "Handyman",
    label: "Handymen",
    src: "/illustrations/icon-handyman.webp",
    width: 512,
    height: 512,
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
