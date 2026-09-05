import type { MetadataRoute } from "next";
import { SUBJECTS } from "./lib/subjects";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/auth/login",
    "/auth/sign-up",
    "/dashboard",
    "/subjects",
    "/calculator",
  ].map((path) => ({ url: `${siteUrl}${path}`, lastModified: now }));

  const subjectRoutes = SUBJECTS.flatMap((s) => [
    { url: `${siteUrl}/subjects/${s.slug}`, lastModified: now },
    ...s.chapters.map((c) => ({
      url: `${siteUrl}/subjects/${s.slug}/${c.slug}`,
      lastModified: now,
    })),
  ]);

  return [...staticRoutes, ...subjectRoutes];
}
