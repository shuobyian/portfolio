import { Github, Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "chickby@gmail.com",
    href: "mailto:chickby@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/shuobyian",
    href: "https://github.com/shuobyian",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+82 10-8620-6124",
    href: "tel:+821086206124",
  },
];

export default function ContactPage() {
  return (
    <Section>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        함께 일하고 싶으시거나, 궁금한 점이 있으시면 편하게 연락해주세요.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-lg border border-border p-8 text-center hover:border-accent/50 transition-colors"
          >
            <contact.icon
              size={24}
              className="text-muted-foreground group-hover:text-accent transition-colors"
            />
            <span className="font-medium">{contact.label}</span>
            <span className="text-sm text-muted-foreground">
              {contact.value}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
