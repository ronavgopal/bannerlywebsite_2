/**
 * Site-wide settings for Bannerly.
 *
 * Values that depend on accounts Bannerly hasn't set up yet (contact email,
 * donation platform, social profiles) are read from environment variables so
 * they can be added in Vercel without a code change. Anything left empty is
 * simply hidden on the site.
 */
export const site = {
  name: "Bannerly",
  tagline: "Every cause deserves a banner",
  description:
    "Bannerly pairs small nonprofits with volunteer designers and marketers to create free social media and web content that reaches the people they serve.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Link to the donation page on Zeffy, Givebutter or Stripe. */
  donateUrl: process.env.NEXT_PUBLIC_DONATE_URL ?? "",
  /** Comma-separated "Label|https://url" pairs, e.g. "Instagram|https://instagram.com/bannerly". */
  socialLinks: (process.env.NEXT_PUBLIC_SOCIAL_LINKS ?? "")
    .split(",")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [label, url] = pair.split("|");
      return { label: label?.trim() ?? "", url: url?.trim() ?? "" };
    })
    .filter((link) => link.label && link.url),
};

export const navLinks = [
  { label: "For Nonprofits", href: "/for-nonprofits" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Our Work", href: "/our-work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/** Where "Donate" buttons go: the donation platform if configured, else the sponsor form. */
export const donateHref = site.donateUrl || "/donate#give";
