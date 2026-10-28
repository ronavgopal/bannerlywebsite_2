import { HorizontalLogo } from "@/bannerly/logo";
import { ButtonLink } from "@/common/button";
import type { fragmentOn } from "basehub";
import type { buttonFragment } from "@/lib/basehub/fragments";
import { navLinks } from "@/bannerly/config";

import { DesktopMenu, MobileMenu } from "./navigation-menu";

/* The menu components were built for BaseHub data; Bannerly passes the same shape from code. */
export type HeaderLiksFragment = {
  _id: string;
  _title: string;
  href: string | null;
  sublinks: {
    items: {
      _id: string;
      _title: string;
      link:
        | { __typename: "CustomTextComponent"; text: string }
        | { __typename: "PageReferenceComponent"; page: { pathname: string; _title: string } };
    }[];
  };
};

export type HeaderFragment = {
  navbar: { items: HeaderLiksFragment[] };
  rightCtas: { items: fragmentOn.infer<typeof buttonFragment>[] };
};

const header = {
  navbar: {
    items: navLinks.map((link) => ({
      _id: link.href,
      _title: link.label,
      href: link.href,
      sublinks: { items: [] },
    })),
  },
  rightCtas: {
    items: [
      { _id: "donate", label: "Donate", href: "/donate", type: "secondary", icon: null },
      {
        _id: "apply",
        label: "Get Free Help",
        href: "/for-nonprofits#apply",
        type: "primary",
        icon: null,
      },
    ],
  },
} as HeaderFragment;

export function Header() {
  return (
    <header className="border-border bg-surface-primary sticky top-0 left-0 z-100 flex w-full flex-col border-b">
      <div className="bg-surface-primary flex h-(--header-height)">
        <div className="grid-cols-header container mx-auto grid w-full place-items-center content-center items-center px-6 *:first:justify-self-start">
          <ButtonLink
            unstyled
            aria-label="Bannerly home"
            className="flex items-center ring-offset-2"
            href="/"
          >
            <HorizontalLogo className="text-accent-500 h-8 w-auto" />
          </ButtonLink>
          <DesktopMenu {...header} />
          <MobileMenu {...header} />
        </div>
      </div>
    </header>
  );
}
