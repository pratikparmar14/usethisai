import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes (always included)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://usethisai.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://usethisai.com/professions',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://usethisai.com/tools',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  try {
    // Try to get dynamic routes from database
    const professions = await prisma.profession.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    const tools = await prisma.tool.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    // Dynamic profession routes
    const professionRoutes: MetadataRoute.Sitemap = professions.map((profession: typeof professions[0]) => ({
      url: `https://usethisai.com/ai-tools-for/${profession.slug}`,
      lastModified: profession.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Dynamic tool routes
    const toolRoutes: MetadataRoute.Sitemap = tools.map((tool: typeof tools[0]) => ({
      url: `https://usethisai.com/tools/${tool.slug}`,
      lastModified: tool.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...professionRoutes, ...toolRoutes];
  } catch (error) {
    console.warn('Database unavailable during build, returning static sitemap:', error);
    // Return static routes only if database fails
    return staticRoutes;
  }
}
