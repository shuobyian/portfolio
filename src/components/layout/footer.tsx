import { Github, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/shuobyian", icon: Github, label: "GitHub" },
  { href: "mailto:chickby@gmail.com", icon: Mail, label: "Email" },
];

const SITE_REPO = "https://github.com/shuobyian/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Subeen Chang. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-center sm:gap-3">
          <span>Built with Next.js 16 · React 19 · Tailwind CSS v4</span>
          <span className="hidden sm:inline">·</span>
          <a
            href={SITE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Github size={12} />
            이 사이트의 소스 코드
          </a>
        </div>
      </div>
    </footer>
  );
}
