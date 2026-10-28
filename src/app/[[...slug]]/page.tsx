import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { pages } from "@/bannerly/pages";

export const dynamic = "force-static";
export const dynamicParams = false;

function pathFrom(slug?: string[]) {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

export const generateStaticParams = async () =>
  Object.keys(pages).map((path) => ({ slug: path.split("/").filter(Boolean) }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> => {
  const page = pages[pathFrom((await params).slug)];
  if (!page) return {};
  return {
    ...(page.title ? { title: page.title } : {}),
    description: page.description,
  };
};

export default async function BannerlyPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const page = pages[pathFrom((await params).slug)];
  if (!page) notFound();
  const { Component } = page;
  return <Component />;
}
