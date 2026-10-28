import clsx from "clsx";
import { CheckIcon } from "@radix-ui/react-icons";

import { ButtonLink } from "@/common/button";
import { Heading } from "@/common/heading";
import { Section } from "@/common/layout";
import calloutStyles from "@/app/_sections/callout-1/callout-1.module.scss";

import { BannerlyForm, type Field } from "./form";
import { FlagLogo } from "./logo";
import type { FormKind } from "./actions";

type Action = { label: string; href: string; intent?: "primary" | "secondary" | "tertiary" };

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

export function PageHero({
  tag,
  title,
  subtitle,
  actions,
}: {
  tag: string;
  title: string;
  subtitle: string;
  actions: Action[];
}) {
  return (
    <section className="relative min-h-[calc(560px-var(--header-height))] overflow-hidden pb-10">
      <div className="border-border absolute top-0 left-0 z-0 grid h-full w-full grid-cols-[clamp(28px,10vw,120px)_auto_clamp(28px,10vw,120px)] border-b">
        <div className="col-span-1 flex h-full items-center justify-center" />
        <div className="border-border col-span-1 flex h-full items-center justify-center border-x" />
        <div className="col-span-1 flex h-full items-center justify-center" />
      </div>
      <figure className="bg-accent-500/25 pointer-events-none absolute -bottom-[70%] left-1/2 z-0 block aspect-square w-[520px] -translate-x-1/2 rounded-full blur-[200px]" />
      <div className="divide-border relative z-10 flex flex-col divide-y pt-[35px]">
        <div className="flex flex-col items-center justify-end">
          <p className="border-border text-text-tertiary flex items-center gap-2 border border-b-0 px-4 py-2 text-sm tracking-tight">
            <FlagMark className="text-accent-500 size-4" />
            {tag}
          </p>
        </div>
        <div>
          <div className="mx-auto flex min-h-[260px] max-w-[80vw] shrink-0 flex-col items-center justify-center gap-3 px-2 py-6 sm:px-16 lg:px-24">
            <h1 className="text-text-primary max-w-(--breakpoint-lg) text-center text-[clamp(32px,7vw,64px)] leading-none font-medium tracking-[-1.44px] text-pretty md:tracking-[-2.16px]">
              {title}
            </h1>
            <p className="text-text-tertiary max-w-2xl text-center text-base text-pretty md:text-lg">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center px-8 sm:px-24">
          <div className="flex w-full max-w-[80vw] flex-col items-center justify-start md:max-w-[392px]!">
            {actions.map(({ href, label, intent = "primary" }) => (
              <ButtonLink
                key={label}
                className={clsx(
                  "h-14! w-full flex-col items-center justify-center rounded-none text-base!",
                  intent === "primary"
                    ? "flex"
                    : "border-border flex border-x! border-y-0! bg-transparent! backdrop-blur-xl transition-colors duration-150 hover:bg-black/5!",
                )}
                href={href}
                intent={intent}
              >
                {label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The flag from the Bannerly logo, for small accents. */
export function FlagMark({ className }: { className?: string }) {
  return <FlagLogo className={className} />;
}

/* -------------------------------------------------------------------------- */
/*                                   Steps                                    */
/* -------------------------------------------------------------------------- */

export function Steps({
  id,
  tag,
  title,
  subtitle,
  steps,
}: {
  id?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <Section id={id}>
      <Heading subtitle={subtitle} tag={tag}>
        <h2>{title}</h2>
      </Heading>
      <ol
        className={clsx(
          "grid w-full grid-cols-1 gap-4 lg:gap-5",
          steps.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="border-border bg-surface-primary flex flex-col gap-4 rounded-lg border p-5"
          >
            <span className="bg-accent-500 text-text-on-accent-primary flex size-9 items-center justify-center rounded-full text-sm font-medium">
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="text-text-secondary text-pretty">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Icon features                               */
/* -------------------------------------------------------------------------- */

export function IconGrid({
  id,
  tag,
  title,
  subtitle,
  items,
  actions,
}: {
  id?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  items: { icon: React.ReactNode; title: string; description: string }[];
  actions?: Action[];
}) {
  return (
    <Section id={id}>
      <Heading subtitle={subtitle} tag={tag}>
        <h2>{title}</h2>
      </Heading>
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-4 lg:gap-5",
          items.length === 4 ? "md:grid-cols-2" : "lg:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="border-border flex flex-col gap-4 rounded-lg border p-5"
          >
            <figure className="border-border bg-surface-secondary text-accent-500 flex size-9 items-center justify-center rounded-full border p-2">
              {item.icon}
            </figure>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-text-secondary text-pretty">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      {actions?.length ? <Actions actions={actions} /> : null}
    </Section>
  );
}

function Actions({ actions }: { actions: Action[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {actions.map((action) => (
        <ButtonLink
          key={action.label}
          href={action.href}
          intent={action.intent ?? "primary"}
          size="lg"
        >
          {action.label}
        </ButtonLink>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Stats                                   */
/* -------------------------------------------------------------------------- */

export function Stats({
  tag,
  title,
  subtitle,
  stats,
  note,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  stats: { value: string; label: string }[];
  note?: string;
}) {
  return (
    <Section>
      <Heading subtitle={subtitle} tag={tag}>
        <h2>{title}</h2>
      </Heading>
      <dl className="border-border bg-border grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl border lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-secondary flex flex-col gap-2 p-6">
            <dt className="text-text-secondary order-2 text-sm text-pretty md:text-base">
              {stat.label}
            </dt>
            <dd className="text-accent-500 order-1 text-4xl font-medium tracking-tighter md:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      {note ? <p className="text-text-tertiary max-w-2xl text-center text-sm">{note}</p> : null}
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Packages / ways to give                        */
/* -------------------------------------------------------------------------- */

export function Packages({
  id,
  tag,
  title,
  subtitle,
  items,
}: {
  id?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  items: {
    name: string;
    price: string;
    billed: string;
    badge?: string;
    features: string[];
    cta: Action;
  }[];
}) {
  return (
    <Section className="xl:max-w-(--breakpoint-xl)" id={id}>
      <Heading subtitle={subtitle} tag={tag}>
        <h2>{title}</h2>
      </Heading>
      <div className="grid gap-5 self-stretch md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.name}
            className={clsx(
              "bg-surface-primary relative flex flex-col overflow-hidden rounded-2xl border",
              item.badge ? "border-accent-500 shadow-md" : "border-border",
            )}
          >
            <header className="flex flex-col gap-4 px-8 pt-10 pb-0">
              {item.badge ? (
                <span className="text-accent-500 absolute top-4 left-1/2 -translate-x-1/2 text-center text-xs font-medium lg:text-sm">
                  {item.badge}
                </span>
              ) : null}
              <span className="text-center text-3xl font-medium lg:text-4xl">{item.price}</span>
              <div className="flex flex-col">
                <h3 className="text-center text-lg font-medium lg:text-xl">{item.name}</h3>
                <p className="text-text-tertiary text-center text-sm lg:text-base">{item.billed}</p>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-6 p-6 lg:p-8">
              <ul className="flex flex-col gap-4">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-text-secondary flex items-start gap-3 text-sm lg:text-base"
                  >
                    <CheckIcon className="text-accent-500 mt-0.5 size-4 shrink-0 lg:size-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <footer className="flex w-full items-center self-stretch p-8 pt-0">
              <ButtonLink
                className="w-full"
                href={item.cta.href}
                intent={item.cta.intent ?? (item.badge ? "primary" : "secondary")}
                size="lg"
              >
                {item.cta.label}
              </ButtonLink>
            </footer>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Checklist                                 */
/* -------------------------------------------------------------------------- */

export function Checklist({
  id,
  tag,
  title,
  subtitle,
  items,
  footer,
}: {
  id?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  items: { title: string; description: string }[];
  footer?: React.ReactNode;
}) {
  return (
    <Section id={id}>
      <article className="border-border bg-surface-secondary flex w-full flex-col gap-8 rounded-xl border p-6 md:flex-row md:gap-16 md:p-10">
        <div className="flex flex-col gap-3 md:w-2/5">
          {tag ? <p className="text-accent-500 text-sm font-medium">{tag}</p> : null}
          <h2 className="text-3xl font-medium tracking-tighter md:text-4xl">{title}</h2>
          {subtitle ? <p className="text-text-tertiary text-lg">{subtitle}</p> : null}
          {footer}
        </div>
        <ul className="flex flex-1 flex-col gap-5">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="bg-accent-500 text-text-on-accent-primary mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                <CheckIcon />
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-medium md:text-lg">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Post formats                                */
/* -------------------------------------------------------------------------- */

const tileTones = [
  "bg-accent-500 text-text-on-accent-primary",
  "bg-surface-tertiary text-accent-700",
  "bg-accent-100 text-accent-700",
];

export function PostTiles({
  tag,
  title,
  subtitle,
  tiles,
  actions,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  tiles: { kind: string; headline: string }[];
  actions?: Action[];
}) {
  return (
    <Section>
      <Heading subtitle={subtitle} tag={tag}>
        <h2>{title}</h2>
      </Heading>
      <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
        {tiles.map((tile, i) => (
          <li
            key={tile.kind}
            className={clsx(
              "relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl p-4 md:p-6",
              tileTones.at(i % tileTones.length),
            )}
          >
            <span className="w-fit rounded-full border border-current/30 px-2.5 py-0.5 text-xs font-medium tracking-tight md:text-sm">
              {tile.kind}
            </span>
            <FlagMark className="absolute -right-6 -bottom-6 size-32 opacity-10 md:size-44" />
            <p className="relative text-lg leading-tight font-medium tracking-tighter text-balance sm:text-xl md:text-3xl">
              {tile.headline}
            </p>
          </li>
        ))}
      </ul>
      {actions?.length ? <Actions actions={actions} /> : null}
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Team                                    */
/* -------------------------------------------------------------------------- */

export function Team({
  tag,
  title,
  subtitle,
  groups,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  groups: { label: string; people: { name: string; role: string }[] }[];
}) {
  return (
    <Section>
      <Heading subtitle={subtitle} tag={tag}>
        <h2>{title}</h2>
      </Heading>
      <div className="flex w-full flex-col gap-10">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-4">
            <h3 className="text-text-tertiary text-center text-sm font-medium tracking-tight uppercase">
              {group.label}
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {group.people.map((person) => (
                <li
                  key={person.name}
                  className="border-border flex w-[170px] flex-col items-center gap-3 rounded-lg border p-5 text-center"
                >
                  <span
                    aria-hidden
                    className="bg-accent-100 text-accent-600 flex size-14 items-center justify-center rounded-full text-xl font-medium"
                  >
                    {person.name.charAt(0)}
                  </span>
                  <div className="flex flex-col">
                    <p className="font-medium">{person.name}</p>
                    <p className="text-text-tertiary text-sm">{person.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Freeform                                  */
/* -------------------------------------------------------------------------- */

export function Story({
  tag,
  title,
  paragraphs,
}: {
  tag?: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <Section>
      <div className="mx-auto flex max-w-prose flex-col gap-5">
        {tag ? <p className="text-accent-500 text-sm font-medium">{tag}</p> : null}
        <h2 className="text-3xl font-medium tracking-tighter md:text-4xl">{title}</h2>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="text-text-secondary text-lg text-pretty">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     FAQ                                    */
/* -------------------------------------------------------------------------- */

export function Faq({
  title = "Frequently asked questions",
  subtitle,
  items,
}: {
  title?: string;
  subtitle?: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <Section>
      <Heading subtitle={subtitle} tag="FAQ">
        <h2>{title}</h2>
      </Heading>
      <ul className="mx-auto flex w-full flex-col place-content-start items-start gap-8 self-stretch lg:grid lg:grid-cols-2 lg:gap-14 lg:px-24">
        {items.map((item) => (
          <li key={item.question} className="flex flex-col gap-1.5">
            <h3 className="leading-relaxed font-medium tracking-tighter sm:text-lg">
              {item.question}
            </h3>
            <p className="text-text-tertiary text-sm leading-relaxed tracking-tight sm:text-base">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Callout                                  */
/* -------------------------------------------------------------------------- */

export function Callout({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions: Action[];
}) {
  return (
    <Section>
      <article className="border-border bg-surface-secondary relative flex flex-col items-center justify-center gap-9 self-stretch overflow-hidden rounded-xl border p-6 py-12">
        <div
          className={clsx(
            "from-accent-500/40 absolute top-10 left-0 h-px w-full bg-linear-to-l to-transparent",
            calloutStyles.line,
          )}
        />
        <div
          className={clsx(
            "from-accent-500/40 absolute bottom-7 left-0 h-px w-full bg-linear-to-l to-transparent",
            calloutStyles.line,
          )}
        />
        <div className="bg-surface-secondary absolute top-0 left-0 z-10 h-full w-full blur-3xl filter" />
        <div className="relative z-20 flex flex-col items-center gap-2 text-center">
          <h2 className="text-center text-3xl font-medium tracking-tighter text-balance md:text-4xl">
            {title}
          </h2>
          <p className="text-text-secondary text-lg text-pretty md:text-xl">{subtitle}</p>
        </div>
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-2">
          {actions.map((action, i) => (
            <ButtonLink
              key={action.label}
              href={action.href}
              intent={action.intent ?? (i === 0 ? "primary" : "secondary")}
              size="lg"
            >
              {action.label}
            </ButtonLink>
          ))}
        </div>
      </article>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Form                                    */
/* -------------------------------------------------------------------------- */

export function FormSection({
  id,
  title,
  subtitle,
  kind,
  fields,
  submitLabel,
}: {
  id: string;
  title: string;
  subtitle: string;
  kind: FormKind;
  fields: Field[];
  submitLabel: string;
}) {
  return (
    <Section className="scroll-mt-(--header-height)" id={id}>
      <div className="border-border bg-surface-primary mx-auto flex w-full max-w-xl flex-col gap-6 rounded-xl border p-6 shadow-md md:p-8">
        <header className="flex flex-col gap-3">
          <FlagMark className="text-accent-500 size-8" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-medium tracking-tighter">{title}</h2>
            <p className="text-text-secondary">{subtitle}</p>
          </div>
        </header>
        <BannerlyForm fields={fields} kind={kind} submitLabel={submitLabel} />
      </div>
    </Section>
  );
}
