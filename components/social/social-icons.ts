import { Mail } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { contactLinks } from "@/components/data/site"
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons/BrandIcons"

type SocialIcon = LucideIcon | typeof GitHubIcon

export const socialIcons: Record<
  (typeof contactLinks)[number]["label"],
  SocialIcon
> = {
  Email: Mail,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
}
