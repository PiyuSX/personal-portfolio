import { contactLinks } from "@/components/data/site"
import { socialIcons } from "@/components/social/social-icons"

type SocialIconLinksProps = {
  className?: string
}

export function SocialIconLinks({
  className = "mt-7 flex items-center gap-2",
}: SocialIconLinksProps) {
  return (
    <div className={className}>
      {contactLinks.map((link) => {
        const Icon = socialIcons[link.label]
        const isExternal = "external" in link && link.external

        return (
          <a
            aria-label={link.label}
            className="flex size-9 items-center justify-center border border-border bg-card text-muted-foreground transition hover:border-foreground/35 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:outline-none"
            href={link.href}
            key={link.label}
            rel={isExternal ? "noreferrer noopener" : undefined}
            target={isExternal ? "_blank" : undefined}
          >
            <Icon aria-hidden className="size-4" />
          </a>
        )
      })}
    </div>
  )
}
