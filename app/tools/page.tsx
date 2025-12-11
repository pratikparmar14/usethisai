import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All AI Tools | UseThisAI',
  description: 'Browse all 25+ AI tools reviewed on UseThisAI. See which professions use each tool and get recommendations.',
};

export default async function ToolsPage() {
  const tools = await prisma.tool.findMany({
    select: { 
      name: true, 
      slug: true, 
      pricing: true,
      website: true,
      professions: {
        select: { profession: true },
        take: 1,
      }
    },
    orderBy: { name: 'asc' },
  });

  return (
    <main className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Header */}
      <section className="relative overflow-hidden bg-neutral-900 py-16 sm:py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-neutral-900 to-neutral-950 opacity-90" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-purple-500 blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            All AI Tools
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300">
            Browse {tools.length}+ AI tools reviewed and recommended for various professions
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-all hover:shadow-lg hover:ring-indigo-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/10 group-hover:to-indigo-500/5 transition-all" />
              
              <div className="relative space-y-4">
                {/* Tool Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">{tool.pricing}</p>
                  </div>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 font-bold text-sm">
                    {tool.name.charAt(0)}
                  </div>
                </div>

                {/* Professions using this tool */}
                {tool.professions.length > 0 && (
                  <div className="pt-2 border-t border-neutral-100">
                    <p className="text-xs font-medium text-neutral-500 mb-2">Used by:</p>
                    <div className="flex flex-wrap gap-2">
                      {tool.professions.map((item) => (
                        <Link
                          key={item.profession.slug}
                          href={`/ai-tools-for/${item.profession.slug}`}
                          className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                        >
                          {item.profession.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visit Link */}
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl mx-auto max-w-7xl px-6 lg:px-8 mb-16 py-16 shadow-2xl">
        <div className="absolute inset-0 bg-neutral-900 mix-blend-multiply opacity-10" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
            Looking for tools for a specific profession?
          </h2>
          <Link
            href="/professions"
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
          >
            Browse by Profession
          </Link>
        </div>
      </section>
    </main>
  );
}
