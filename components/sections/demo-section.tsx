import { resolveDemoEmbed } from "@/lib/demo-video"
import siteConfig from "@/lib/site.config"

export function DemoSection() {
  const demo = siteConfig.sections.demo
  if (!demo.enabled) return null

  const embed = resolveDemoEmbed(demo.videoUrl, demo.title)
  if (!embed) return null

  return (
    <section id="demo" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {demo.title}
          </h2>
          {demo.caption && (
            <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground">
              {demo.caption}
            </p>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/10">
          {embed.kind === "file" ? (
            <video
              className="aspect-video w-full bg-black"
              controls
              preload="metadata"
              playsInline
            >
              <source src={embed.src} />
              Your browser does not support this video.
            </video>
          ) : (
            <iframe
              className="aspect-video w-full"
              src={embed.src}
              title={embed.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
      </div>
    </section>
  )
}
