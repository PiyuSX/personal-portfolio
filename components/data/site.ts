export type SocialLink = {
  label: string
  href: string
  external?: boolean
}

export type Project = {
  title: string
  description: string
  href: string
  label: string
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "GitHub Activity", href: "#github" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const

export const siteConfig = {
  name: "Piyushee",
  title: "Code. Math. Systems.",
  description:
    "I\u2019m building my foundation in programming, mathematics, and modern web technologies as I move toward Computer Engineering.",
  location: "Biratnagar, Nepal",
  email: "piyushraj9825@gmail.com",
  githubUsername: "PiyuSX",
  profileImage: "/profile.jpg",
  links: {
    email: "mailto:piyushraj9825@gmail.com",
    github: "https://github.com/PiyuSX",
    linkedin: "https://www.linkedin.com/in/piyush-rajbanshi-038808317/",
    instagram: "https://www.instagram.com/peeyush.js/",
  },
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "Go",
  ],
  projects: [
    {
      title: "MERN Blog",
      description:
        "A full-stack blog project built with the MERN stack, focused on practical CRUD flows, routing, and backend integration.",
      href: "https://github.com/PiyuSX/MERN-blog",
      label: "Real Project",
    },
  ] satisfies Project[],
} as const

export const contactLinks = [
  { label: "Email", href: siteConfig.links.email },
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "Instagram", href: siteConfig.links.instagram, external: true },
] as const satisfies readonly SocialLink[]
