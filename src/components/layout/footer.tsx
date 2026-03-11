import { Github, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/shuobyian", icon: Github, label: "GitHub" },
  { href: "mailto:chickby@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
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
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
