import { Github, Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
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
      <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        함께 일하고 싶으시거나, 궁금한 점이 있으시면 편하게 연락해주세요.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {contacts.map((contact) => (
          // hover는 움직이지 않는 링크가 받고 안쪽 카드만 떠오른다
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-md"
          >
            <Card overText className="flex h-full flex-col items-center gap-3 border border-border p-8 text-center">
              <contact.icon
                size={24}
                className="text-muted-foreground group-hover:text-accent transition-colors"
              />
              <span className="font-medium">{contact.label}</span>
              <span className="text-sm text-muted-foreground">
                {contact.value}
              </span>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}
