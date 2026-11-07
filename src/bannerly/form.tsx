"use client";

import * as React from "react";
import clsx from "clsx";
import { ArrowRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/common/button";
import { Input } from "@/common/input";
import { LabeledInput, LabeledTextarea, LabeledWrapper } from "@/app/_components/labeled-input";
import { Select } from "@/app/_components/select";
import { submitForm, type FormKind, type FormState } from "./actions";

export type Field =
  | {
      type: "text" | "email" | "url";
      name: string;
      label: string;
      required?: boolean;
      placeholder?: string;
    }
  | { type: "textarea"; name: string; label: string; required?: boolean; placeholder?: string }
  | { type: "select"; name: string; label: string; required?: boolean; options: string[] };

const initialState: FormState = { status: "idle", message: "" };

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company_website">Leave this empty</label>
      <input autoComplete="off" id="company_website" name="company_website" tabIndex={-1} />
    </div>
  );
}

function Status({ state }: { state: FormState }) {
  if (state.status === "idle") return null;
  return (
    <p
      aria-live="polite"
      className={clsx(
        "rounded-md px-3 py-2 text-sm",
        state.status === "success"
          ? "bg-accent-50 text-accent-700"
          : "bg-surface-secondary text-text-secondary",
      )}
      role="status"
    >
      {state.message}
    </p>
  );
}

export function BannerlyForm({
  kind,
  fields,
  submitLabel,
}: {
  kind: FormKind;
  fields: Field[];
  submitLabel: string;
}) {
  const [state, action, pending] = React.useActionState(submitForm.bind(null, kind), initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center" role="status">
        <CheckCircledIcon className="text-accent-500 size-8" />
        <p className="text-lg font-medium">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="relative flex flex-col gap-4">
      <Honeypot />
      {fields.map((field) => {
        const label = field.required ? `${field.label} *` : field.label;
        if (field.type === "textarea") {
          return (
            <LabeledTextarea
              key={field.name}
              className="max-h-64 min-h-24"
              id={`${kind}-${field.name}`}
              label={label}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
            />
          );
        }
        if (field.type === "select") {
          return (
            <LabeledWrapper key={field.name} id={`${kind}-${field.name}`} label={label}>
              <Select id={`${kind}-${field.name}`} name={field.name} required={field.required}>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </LabeledWrapper>
          );
        }
        return (
          <LabeledInput
            key={field.name}
            id={`${kind}-${field.name}`}
            label={label}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            type={field.type}
          />
        );
      })}
      <Status state={state} />
      <div className="mt-2 flex items-center justify-between gap-4">
        <p className="text-text-tertiary text-xs">* Required</p>
        <Button
          disabled={pending}
          icon={<ArrowRightIcon className="size-5" />}
          iconSide="right"
          intent="primary"
          size="lg"
          type="submit"
        >
          {pending ? "Sending…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const [state, action, pending] = React.useActionState(
    submitForm.bind(null, "newsletter"),
    initialState,
  );

  return (
    <form action={action} className="relative flex w-full flex-col gap-3 lg:max-w-md">
      <Honeypot />
      {state.status === "success" ? (
        <Status state={state} />
      ) : (
        <>
          <Input
            aria-label="Email address"
            buttonContent={pending ? "Sending…" : "Subscribe"}
            disabled={pending}
            name="email"
            placeholder="you@example.org"
            required
            type="email"
          />
          <Status state={state} />
        </>
      )}
    </form>
  );
}
