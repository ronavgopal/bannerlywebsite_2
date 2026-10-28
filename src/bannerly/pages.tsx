import {
  BackpackIcon,
  ClockIcon,
  GlobeIcon,
  HeartIcon,
  IdCardIcon,
  LayersIcon,
  LockClosedIcon,
  MixIcon,
  PersonIcon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";

import { donateHref } from "./config";
import {
  Callout,
  Checklist,
  Faq,
  FormSection,
  IconGrid,
  Packages,
  PageHero,
  PostTiles,
  Stats,
  Steps,
  Story,
  Team,
} from "./sections";

const icon = "size-[18px]";

/** Facts from the organization plan, shown while the pilot runs. */
const pilotStats = [
  { value: "5–10", label: "local nonprofits in our first pilot" },
  { value: "4", label: "posts a month in the Starter package" },
  { value: "$0", label: "cost to the nonprofits we serve" },
  { value: "Every", label: "post reviewed by a team lead before it goes out" },
];

const pilotNote =
  "As the pilot runs, we'll report nonprofits served, posts created, engagement growth and volunteer hours here.";

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

function HomePage() {
  return (
    <>
      <PageHero
        actions={[
          { label: "Get Volunteer Marketing", href: "/for-nonprofits" },
          { label: "Volunteer", href: "/volunteer", intent: "secondary" },
        ]}
        subtitle="Bannerly pairs small nonprofits with volunteer designers and marketers to create social media and web content that reaches the people they serve, at no cost."
        tag="Free marketing for small nonprofits"
        title="Every cause deserves a banner"
      />
      <Steps
        steps={[
          {
            title: "Apply",
            description:
              "Tell us about your mission, audience, goals and brand in a short intake form.",
          },
          {
            title: "Get matched",
            description:
              "We pair you with a volunteer creator who drafts your posts, and a team lead reviews every one.",
          },
          {
            title: "Approve and publish",
            description:
              "You approve the posts and publish them, or give us scheduling access. We check in monthly on what worked.",
          },
        ]}
        subtitle="Three steps from application to posts your audience sees."
        tag="How it works"
        title="Marketing help without the marketing budget"
      />
      <Stats note={pilotNote} stats={pilotStats} tag="Impact" title="Our pilot at a glance" />
      <PostTiles
        actions={[{ label: "See our work", href: "/our-work", intent: "secondary" }]}
        subtitle="Example post formats. Real client posts appear on Our Work as the pilot wraps up."
        tag="What we make"
        tiles={[
          { kind: "Event promo", headline: "Join us Saturday at the community garden" },
          { kind: "Fundraiser", headline: "3 days left to reach our goal" },
          { kind: "Giving Tuesday", headline: "Your gift goes twice as far today" },
          { kind: "Volunteer spotlight", headline: "Meet the people behind our Saturday meals" },
          { kind: "Impact story", headline: "What one year of tutoring changed" },
          { kind: "Brand kit", headline: "Templates in your colors, ready to reuse" },
        ]}
        title="Posts that help causes get seen"
      />
      <Callout
        actions={[
          { label: "Get free marketing help", href: "/for-nonprofits#apply" },
          { label: "Volunteer your skills", href: "/volunteer#sign-up" },
        ]}
        subtitle="Nonprofits get content that reaches people. Creatives get real experience."
        title="Two ways to raise a banner"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                               For Nonprofits                               */
/* -------------------------------------------------------------------------- */

function ForNonprofitsPage() {
  const apply = { label: "Apply for free", href: "#apply" };
  return (
    <>
      <PageHero
        actions={[
          { label: "Apply now", href: "#apply" },
          { label: "See packages", href: "#packages", intent: "secondary" },
        ]}
        subtitle="Get social media and web content made by volunteer creators and reviewed by our team, so you can reach your audience without a marketing budget."
        tag="For nonprofits"
        title="Free marketing for small nonprofits"
      />
      <Packages
        id="packages"
        items={[
          {
            name: "Starter",
            price: "Free",
            billed: "Ongoing support",
            badge: "Best place to start",
            features: [
              "4 social posts a month",
              "A basic content calendar",
              "Monthly check-in on what performed",
            ],
            cta: apply,
          },
          {
            name: "Campaign",
            price: "Free",
            billed: "One-time push",
            features: [
              "A focused campaign for one moment",
              "Fundraisers, events or Giving Tuesday",
              "Posts planned around your date",
            ],
            cta: apply,
          },
          {
            name: "Brand kit",
            price: "Free",
            billed: "One-time setup",
            features: [
              "Templates in your colors and fonts",
              "Guidelines for using your logo",
              "Everything you need to post on your own",
            ],
            cta: apply,
          },
          {
            name: "Strategy Development",
            price: "Free",
            billed: "Consultation",
            features: [
              "A consult on your goals and audience",
              "A long-term digital marketing plan",
              "Targets you can measure progress against",
            ],
            cta: apply,
          },
        ]}
        subtitle="Every package is free. Pick the one that fits where you are."
        tag="Packages"
        title="What you get"
      />
      <Checklist
        items={[
          {
            title: "Small nonprofits",
            description: "Organizations without dedicated marketing staff or budget.",
          },
          {
            title: "New to digital marketing",
            description:
              "You want to reach more people online and need experience and hands to do it.",
          },
          {
            title: "Ready to collaborate",
            description:
              "Someone on your team can share brand assets, approve posts and check in monthly.",
          },
        ]}
        subtitle="Bannerly is built for small nonprofits that need digital marketing experience."
        tag="Who qualifies"
        title="Who we serve"
      />
      <Steps
        steps={[
          {
            title: "Tell us about you",
            description:
              "Fill out the intake form with your mission, audience, goals and brand assets.",
          },
          {
            title: "Meet your creator",
            description: "We match you with a volunteer creator who fits your needs.",
          },
          {
            title: "Get drafts",
            description: "Your creator drafts posts using Canva or Figma templates.",
          },
          {
            title: "Quality check",
            description: "A Bannerly team lead reviews every post before you see it.",
          },
          {
            title: "Approve and publish",
            description:
              "You approve the posts and publish them, or give our team scheduling access.",
          },
          {
            title: "Learn and improve",
            description: "We check in monthly to see what performed well and adjust.",
          },
        ]}
        tag="The process"
        title="From application to published posts"
      />
      <Faq
        items={[
          {
            question: "Is it really free?",
            answer:
              "Yes. Bannerly is funded by grants, sponsors and donors, so the nonprofits we serve pay nothing.",
          },
          {
            question: "Who creates the posts?",
            answer:
              "Volunteer creators: design and marketing students, freelancers and retirees. A team lead reviews every post.",
          },
          {
            question: "Who publishes them?",
            answer:
              "You do. You approve each post and publish it yourself, or give our team scheduling access.",
          },
          {
            question: "What do you need from us?",
            answer:
              "Your mission, audience, goals and any brand assets you have, like a logo, colors and fonts.",
          },
        ]}
      />
      <FormSection
        fields={[
          { type: "text", name: "organization", label: "Organization name", required: true },
          { type: "text", name: "name", label: "Your name", required: true },
          { type: "email", name: "email", label: "Email", required: true },
          {
            type: "url",
            name: "website",
            label: "Website or social media link",
            placeholder: "https://",
          },
          { type: "textarea", name: "mission", label: "Your mission", required: true },
          {
            type: "textarea",
            name: "audience",
            label: "Who are you trying to reach?",
            required: true,
          },
          {
            type: "textarea",
            name: "goals",
            label: "What are your goals?",
            required: true,
            placeholder: "More volunteers, more donations, a bigger event turnout…",
          },
          {
            type: "select",
            name: "package",
            label: "Package you're interested in",
            required: true,
            options: ["Starter", "Campaign", "Brand kit", "Strategy Development", "Not sure yet"],
          },
          {
            type: "url",
            name: "brandAssets",
            label: "Link to your brand assets (logo, colors, fonts)",
            placeholder: "Google Drive, Dropbox…",
          },
        ]}
        id="apply"
        kind="nonprofit-application"
        submitLabel="Submit application"
        subtitle="Tell us about your organization. It takes about five minutes."
        title="Apply for free marketing help"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Volunteer                                 */
/* -------------------------------------------------------------------------- */

function VolunteerPage() {
  return (
    <>
      <PageHero
        actions={[
          { label: "Sign up to volunteer", href: "#sign-up" },
          { label: "How it works", href: "#how-it-works", intent: "secondary" },
        ]}
        subtitle="Create real marketing for small nonprofits. Earn portfolio pieces, service hours and LinkedIn recommendations while you help a cause get seen."
        tag="For creatives"
        title="Build your portfolio with causes that matter"
      />
      <IconGrid
        items={[
          {
            icon: <LayersIcon className={icon} />,
            title: "Portfolio pieces",
            description: "Published work for real organizations, not class projects.",
          },
          {
            icon: <BackpackIcon className={icon} />,
            title: "Real client experience",
            description: "Work with a nonprofit's goals, feedback and deadlines.",
          },
          {
            icon: <ClockIcon className={icon} />,
            title: "Service hours",
            description: "Volunteer time that counts toward school or community requirements.",
          },
          {
            icon: <IdCardIcon className={icon} />,
            title: "LinkedIn recommendations",
            description: "Recommendations from the team that reviewed your work.",
          },
        ]}
        tag="Why join"
        title="What you get from volunteering"
      />
      <Checklist
        items={[
          {
            title: "Design and marketing students",
            description: "Put your coursework into practice for a real client.",
          },
          {
            title: "Freelancers between gigs",
            description: "Keep your skills sharp and your portfolio current.",
          },
          {
            title: "Retirees",
            description: "Share years of experience with causes that need it.",
          },
        ]}
        subtitle="If you can design or write for social media, there's a nonprofit that needs you."
        tag="Who we're looking for"
        title="Creators from every stage of life"
      />
      <Steps
        id="how-it-works"
        steps={[
          {
            title: "Get matched",
            description: "We pair you with a nonprofit based on your skills and its goals.",
          },
          {
            title: "Create",
            description: "Draft posts with ready-made Canva or Figma templates.",
          },
          {
            title: "Get reviewed",
            description:
              "A team lead reviews every post before it goes out, so quality stays consistent.",
          },
          {
            title: "See results",
            description: "Check in monthly with your nonprofit to see what performed well.",
          },
        ]}
        tag="How it works"
        title="How volunteering works"
      />
      <Faq
        items={[
          {
            question: "Do I need professional experience?",
            answer:
              "No. Students are welcome. Templates and team-lead reviews help you deliver professional work.",
          },
          {
            question: "What tools do I need?",
            answer: "Canva or Figma. We create posts from templates in both.",
          },
          {
            question: "Can I earn service hours?",
            answer: "Yes. Let us know on the sign-up form so we can track your hours.",
          },
          {
            question: "Who reviews my work?",
            answer: "A Bannerly team lead checks every post before it goes to the nonprofit.",
          },
        ]}
      />
      <FormSection
        fields={[
          { type: "text", name: "name", label: "Your name", required: true },
          { type: "email", name: "email", label: "Email", required: true },
          {
            type: "select",
            name: "background",
            label: "I am a…",
            required: true,
            options: ["Design student", "Marketing student", "Freelancer", "Retiree", "Other"],
          },
          {
            type: "textarea",
            name: "skills",
            label: "Your skills",
            required: true,
            placeholder: "Graphic design, copywriting, video, photography…",
          },
          {
            type: "select",
            name: "tools",
            label: "Tools you use",
            options: ["Canva", "Figma", "Both", "Other"],
          },
          { type: "url", name: "portfolio", label: "Portfolio link", placeholder: "https://" },
          {
            type: "select",
            name: "hours",
            label: "Hours you can give per month",
            options: ["1–5", "5–10", "10+"],
          },
          {
            type: "select",
            name: "serviceHours",
            label: "Do you need service hours tracked?",
            options: ["Yes", "No"],
          },
        ]}
        id="sign-up"
        kind="volunteer-signup"
        submitLabel="Sign up"
        subtitle="Tell us about your skills and we'll match you with a nonprofit."
        title="Volunteer with Bannerly"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Our Work                                  */
/* -------------------------------------------------------------------------- */

function OurWorkPage() {
  return (
    <>
      <PageHero
        actions={[
          { label: "Become a pilot nonprofit", href: "/for-nonprofits#apply" },
          { label: "Volunteer", href: "/volunteer", intent: "secondary" },
        ]}
        subtitle="Each month we add the posts our volunteers created, with before-and-after engagement numbers for the nonprofit."
        tag="Our work"
        title="Real posts, real results"
      />
      <Checklist
        items={[
          {
            title: "The nonprofit and its goal",
            description: "Who we worked with and what they wanted to achieve.",
          },
          {
            title: "The package",
            description: "Starter, Campaign, Brand kit or Strategy Development.",
          },
          {
            title: "The posts",
            description: "The content our volunteer creators made and published.",
          },
          {
            title: "Before and after",
            description: "Engagement numbers from before Bannerly and after.",
          },
        ]}
        subtitle="Our first pilot with 5–10 local nonprofits is underway. Case studies appear here as each one wraps up."
        tag="Pilot in progress"
        title="What every case study will show"
      />
      <Callout
        actions={[
          { label: "Apply for free", href: "/for-nonprofits#apply" },
          { label: "Volunteer your skills", href: "/volunteer#sign-up" },
        ]}
        subtitle="Join the pilot and help us build the first gallery of results."
        title="Want to be one of our first stories?"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    About                                   */
/* -------------------------------------------------------------------------- */

function AboutPage() {
  return (
    <>
      <PageHero
        actions={[
          { label: "Work with us", href: "/for-nonprofits" },
          { label: "Support our work", href: "/donate", intent: "secondary" },
        ]}
        subtitle="We design digital marketing content and run social media and web campaigns so nonprofits can better reach the people they serve."
        tag="About Bannerly"
        title="Every cause deserves a banner"
      />
      <Story
        paragraphs={[
          "Small nonprofits do important work, but few have the marketing experience or budget to tell people about it.",
          "At the same time, design and marketing students, freelancers between gigs and retirees want real projects that make a difference.",
          "Bannerly brings them together. Volunteers create the content, our core team reviews every post, and nonprofits get marketing that helps their cause get seen.",
        ]}
        tag="Our story"
        title="Why Bannerly exists"
      />
      <IconGrid
        items={[
          {
            icon: <HeartIcon className={icon} />,
            title: "Free for nonprofits",
            description: "Grants, sponsors and donors cover our costs so our clients pay nothing.",
          },
          {
            icon: <StarIcon className={icon} />,
            title: "Quality on every post",
            description: "A core team lead checks every post before it goes out.",
          },
          {
            icon: <PersonIcon className={icon} />,
            title: "Powered by volunteers",
            description: "Creatives build their portfolios while helping causes they care about.",
          },
        ]}
        tag="How we work"
        title="What we stand for"
      />
      <Team
        groups={[
          { label: "Founder", people: [{ name: "Ronav", role: "Founder" }] },
          {
            label: "Board",
            people: [
              { name: "Lisa", role: "Board member" },
              { name: "Courtney", role: "Board member" },
              { name: "Justin", role: "Board member" },
              { name: "Akshitha", role: "Board member" },
              { name: "Vandana", role: "Board member" },
            ],
          },
        ]}
        tag="Our team"
        title="The people behind Bannerly"
      />
      <Stats note={pilotNote} stats={pilotStats} tag="Impact" title="Our pilot at a glance" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Donate / Partner                             */
/* -------------------------------------------------------------------------- */

function DonatePage() {
  return (
    <>
      <PageHero
        actions={[
          { label: "Donate", href: donateHref },
          { label: "Become a sponsor", href: "#partner", intent: "secondary" },
        ]}
        subtitle="Our service is free for nonprofits. Your support covers design tools, our website and insurance, and in time, staff."
        tag="Donate / Partner"
        title="Help every cause get its banner"
      />
      <Packages
        id="give"
        items={[
          {
            name: "Monthly giving",
            price: "Monthly",
            billed: "For individuals",
            badge: "Most impact",
            features: [
              "Steady support for ongoing client work",
              "Covers the tools our volunteers use",
              "Cancel anytime",
            ],
            cta: { label: "Give monthly", href: donateHref },
          },
          {
            name: "Annual campaign",
            price: "Once",
            billed: "For individuals",
            features: [
              "Join our yearly fundraising campaign",
              "Any amount helps a nonprofit get seen",
              "One gift, no commitment",
            ],
            cta: { label: "Give once", href: donateHref },
          },
          {
            name: "Sponsor a nonprofit",
            price: "1 year",
            billed: "For local businesses",
            features: [
              "Fund one nonprofit's content for a year",
              "Get recognized for your support",
              "Show your community you care",
            ],
            cta: { label: "Become a sponsor", href: "#partner" },
          },
          {
            name: "In-kind",
            price: "Tools",
            billed: "For companies",
            features: [
              "Donate software licenses",
              "Programs like TechSoup make it easy",
              "Equip volunteers with pro tools",
            ],
            cta: { label: "Offer tools", href: "#partner" },
          },
        ]}
        subtitle="Choose how you'd like to support free marketing for nonprofits."
        tag="Ways to give"
        title="Every gift raises a banner"
      />
      <IconGrid
        items={[
          {
            icon: <MixIcon className={icon} />,
            title: "Design tools",
            description: "Canva, Figma and the templates our volunteers use.",
          },
          {
            icon: <GlobeIcon className={icon} />,
            title: "Our website",
            description: "Hosting and the site that connects nonprofits with creators.",
          },
          {
            icon: <LockClosedIcon className={icon} />,
            title: "Insurance",
            description: "Protection for our organization, volunteers and clients.",
          },
          {
            icon: <RocketIcon className={icon} />,
            title: "Staff, in time",
            description: "Paid coordinators so we can serve more nonprofits.",
          },
        ]}
        tag="Where your money goes"
        title="What your support pays for"
      />
      <Faq
        items={[
          {
            question: "Is my donation tax-deductible?",
            answer:
              "Bannerly is setting up as a 501(c)(3) nonprofit. We'll confirm here once our status is approved.",
          },
          {
            question: "How are sponsors recognized?",
            answer:
              "Sponsors are recognized for the nonprofit content they fund. Send us a note below and we'll share the details.",
          },
          {
            question: "Can I donate software instead of money?",
            answer:
              "Yes. Software licenses help our volunteers do their best work. Use the form below to get in touch.",
          },
          {
            question: "Do you accept grants?",
            answer:
              "Yes. We work with community foundations and corporate giving programs. Reach out through the form below.",
          },
        ]}
      />
      <FormSection
        fields={[
          { type: "text", name: "organization", label: "Business or organization", required: true },
          { type: "text", name: "name", label: "Your name", required: true },
          { type: "email", name: "email", label: "Email", required: true },
          {
            type: "select",
            name: "interest",
            label: "I'm interested in",
            required: true,
            options: [
              "Sponsoring a nonprofit for a year",
              "In-kind donation",
              "Grant or corporate giving",
              "Something else",
            ],
          },
          { type: "textarea", name: "message", label: "Message" },
        ]}
        id="partner"
        kind="sponsor-inquiry"
        submitLabel="Send"
        subtitle="Tell us how you'd like to help and we'll be in touch."
        title="Partner with Bannerly"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Registry                                  */
/* -------------------------------------------------------------------------- */

export const pages: Record<
  string,
  { title?: string; description: string; Component: () => React.ReactNode }
> = {
  "/": {
    description:
      "Free social media and web marketing for small nonprofits, created by volunteer designers and marketers.",
    Component: HomePage,
  },
  "/for-nonprofits": {
    title: "For Nonprofits",
    description:
      "Free marketing packages for small nonprofits: social posts, campaigns, brand kits and strategy. Apply today.",
    Component: ForNonprofitsPage,
  },
  "/volunteer": {
    title: "Volunteer",
    description:
      "Design and marketing volunteers build portfolios, earn service hours and help nonprofits get seen.",
    Component: VolunteerPage,
  },
  "/our-work": {
    title: "Our Work",
    description:
      "Posts our volunteers made for nonprofits, with before-and-after engagement results.",
    Component: OurWorkPage,
  },
  "/about": {
    title: "About",
    description: "Bannerly's mission, story and team.",
    Component: AboutPage,
  },
  "/donate": {
    title: "Donate / Partner",
    description: "Support free marketing for nonprofits as a donor, sponsor or in-kind partner.",
    Component: DonatePage,
  },
};
