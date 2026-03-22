const tiers = [
  {
    name: "Reader",
    price: "Free",
    period: null,
    description: "For individuals exploring the fundamentals.",
    features: [
      "Access to public articles",
      "Monthly digest",
      "Community forum",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Practitioner",
    price: "$18",
    period: "/ month",
    description: "For professionals who ship weekly.",
    features: [
      "Everything in Reader",
      "Full archive access",
      "Component library",
      "Priority support",
      "Early feature access",
    ],
    cta: "Get Practitioner",
    highlighted: true,
  },
  {
    name: "Studio",
    price: "$64",
    period: "/ month",
    description: "For teams building at scale.",
    features: [
      "Everything in Practitioner",
      "Unlimited seats",
      "Design system license",
      "Private Slack channel",
      "Quarterly reviews",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="bg-[#0f0e0d] py-28 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="max-w-xl mb-20">
        <p className="text-[#c2440e] text-xs tracking-[0.3em] uppercase font-sans mb-4">
          — Pricing
        </p>
        <h2 className="font-serif text-[#e8e0d5] text-[clamp(2rem,5vw,4rem)] leading-tight">
          Choose your depth.
        </h2>
      </div>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#2a2622]">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col p-10 ${
              tier.highlighted ? "bg-[#c2440e]" : "bg-[#0f0e0d]"
            }`}
          >
            {/* Tier name */}
            <span
              className={`font-sans text-xs tracking-[0.3em] uppercase mb-8 ${
                tier.highlighted ? "text-[#0f0e0d]" : "text-[#4a4540]"
              }`}
            >
              {tier.name}
            </span>

            {/* Price */}
            <div className="mb-2 flex items-baseline gap-1">
              <span
                className={`font-serif text-[clamp(3rem,6vw,5rem)] leading-none ${
                  tier.highlighted ? "text-[#0f0e0d]" : "text-[#e8e0d5]"
                }`}
              >
                {tier.price}
              </span>
              {tier.period && (
                <span
                  className={`font-sans text-sm ${
                    tier.highlighted ? "text-[#3d1506]" : "text-[#4a4540]"
                  }`}
                >
                  {tier.period}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              className={`font-sans text-sm leading-relaxed mb-10 ${
                tier.highlighted ? "text-[#3d1506]" : "text-[#7a7268]"
              }`}
            >
              {tier.description}
            </p>

            {/* Divider */}
            <div
              className={`h-px mb-8 ${
                tier.highlighted ? "bg-[#a03509]" : "bg-[#2a2622]"
              }`}
            />

            {/* Features */}
            <ul className="flex flex-col gap-3 mb-12 flex-1">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className={`font-sans text-sm flex items-start gap-3 ${
                    tier.highlighted ? "text-[#0f0e0d]" : "text-[#9e9488]"
                  }`}
                >
                  <span
                    className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                      tier.highlighted ? "bg-[#0f0e0d]" : "bg-[#c2440e]"
                    }`}
                  />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#"
              className={`text-center text-xs tracking-[0.25em] uppercase font-sans py-4 transition-colors duration-300 ${
                tier.highlighted
                  ? "bg-[#0f0e0d] text-[#c2440e] hover:bg-[#1a1714]"
                  : "border border-[#2a2622] text-[#e8e0d5] hover:border-[#c2440e] hover:text-[#c2440e]"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <p className="mt-8 text-[#4a4540] text-xs font-sans tracking-wide">
        All plans billed monthly. Annual billing available at 20% discount.
      </p>
    </section>
  );
}
