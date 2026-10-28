import { Section } from "@/common/layout";
import { NewsletterForm } from "@/bannerly/form";

export function Newsletter() {
  return (
    <Section className="bg-surface-secondary py-10!" container="full">
      <div className="container mx-auto flex flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col items-start gap-1">
          <h2 className="text-xl font-medium lg:text-2xl">Get social media tips for nonprofits</h2>
          <p className="text-text-tertiary lg:text-lg">
            Practical ideas and Bannerly news, about once a month.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </Section>
  );
}
