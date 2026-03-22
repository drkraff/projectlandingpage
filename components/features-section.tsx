const features = [
  {
    number: "01",
    heading: "Uncompromising Type",
    body: "Every decision starts with typography. Line length, weight contrast, optical sizing — treated as primary design infrastructure.",
  },
  {
    number: "02",
    heading: "System Thinking",
    body: "Components aren't built in isolation. Each piece inherits from a shared token set, so nothing breaks when something scales.",
  },
  {
    number: "03",
    heading: "Honest Performance",
    body: "No synthetic benchmarks. Real Core Web Vitals on real hardware, committed to the repository as a living constraint.",
  },
  {
    number: "04",
    heading: "Editorial Discipline",
    body: "Features ship with documentation. If you can't explain it plainly, the feature isn't ready. Writing forces clarity.",
  },
  {
    number: "05",
    heading: "Durability Over Novelty",
    body: "We choose boring infrastructure deliberately. The interesting problems live in product — not in reinvented build tooling.",
  },
  {
    number: "06",
    heading: "Open by Default",
    body: "No proprietary lock-in. Every abstraction can be ejected. You own the output.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#1a1714] py-28 px-6 md:px-12 lg:px-20">
      {/* Section header */}
      <div className="flex items-baseline justify-between border-b border-[#2e2b27] pb-6 mb-16">
        <h2 className="font-serif text-[#e8e0d5] text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          Principles
        </h2>
        <span className="text-[#4a4540] text-xs tracking-[0.25em] uppercase font-sans hidden md:block">
          What we stand for
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {features.map((f, i) => (
          <div
            key={f.number}
            className={`py-10 pr-0 md:pr-12 ${
              i < features.length - (features.length % 3 === 0 ? 3 : features.length % 3)
                ? "border-b border-[#2e2b27]"
                : ""
            } ${i % 3 !== 2 ? "lg:border-r lg:border-[#2e2b27]" : ""} ${
              i % 2 !== 1 ? "md:border-r md:border-[#2e2b27] lg:border-none" : ""
            }`}
          >
            <span className="block font-sans text-[#c2440e] text-xs tracking-[0.3em] mb-5">
              {f.number}
            </span>
            <h3 className="font-serif text-[#e8e0d5] text-2xl lg:text-3xl leading-tight mb-4">
              {f.heading}
            </h3>
            <p className="font-sans text-[#7a7268] text-sm leading-relaxed max-w-xs">
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
