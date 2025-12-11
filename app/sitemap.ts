import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Get all professions
    const professions = await prisma.profession.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    // Get all tools
    const tools = await prisma.tool.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    // Static routes
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

    // Dynamic profession routes (priority pages for monetization)
    const professionRoutes: MetadataRoute.Sitemap = professions.map((profession: typeof professions[0]) => ({
      url: `https://usethisai.com/ai-tools-for/${profession.slug}`,
      lastModified: profession.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8, // High priority for money pages
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
    console.error('Error generating sitemap:', error);
    // Return at least the static routes if DB fails
    return [
      {
        url: 'https://usethisai.com',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
