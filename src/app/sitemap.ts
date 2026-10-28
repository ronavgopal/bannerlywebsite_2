import { siteUrl } from "@/lib/constants";
import { pages } from "@/bannerly/pages";
import { basehub } from "basehub";
import type { MetadataRoute } from "next";

export const revalidate = 1800; // 30 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [...Object.keys(pages), "/blog"].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));

  // Blog posts are still managed in BaseHub.
  let posts: MetadataRoute.Sitemap = [];
  try {
    const data = await basehub().query({
      site: { blog: { posts: { items: { _slug: true } } } },
    });
    posts = data.site.blog.posts.items.map((post) => ({
      url: `${siteUrl}/blog/${post._slug}`,
      lastModified: new Date(),
    }));
  } catch (error) {
    console.error("Could not load blog posts for the sitemap", error);
  }

  return [...staticPages, ...posts];
}
