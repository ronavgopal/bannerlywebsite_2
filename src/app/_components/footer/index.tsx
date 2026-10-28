import { HorizontalLogo } from "@/bannerly/logo";
import Link from "next/link";

import { ButtonLink } from "@/common/button";
import { navLinks, site } from "@/bannerly/config";

const footerLinks = [
  ...navLinks.filter((l) => l.href !== "/blog"),
  { label: "Donate", href: "/donate" },
  { label: "Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="border-border border-t py-16">
      <div className="container mx-auto flex flex-col gap-10 px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <Link aria-label="Bannerly home" href="/">
              <HorizontalLogo className="text-accent-500 h-9 w-auto" />
            </Link>
            <p className="text-text-tertiary">{site.tagline}.</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {footerLinks.map(({ label, href }) => (
              <ButtonLink
                key={href}
                unstyled
                className="text-text-secondary hover:text-accent-500 font-light tracking-tight"
                href={href}
              >
                {label}
              </ButtonLink>
            ))}
          </nav>
        </div>
        <div className="border-border text-text-tertiary flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bannerly. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.contactEmail ? (
              <li>
                <a className="hover:text-accent-500" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </li>
            ) : null}
            {site.socialLinks.map((link) => (
              <li key={link.url}>
                <a
                  className="hover:text-accent-500"
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
