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
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            All AI Tools
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
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
              className="group relative overflow-hidden rounded-xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-sm transition-all hover:shadow-2xl hover:bg-white/10 hover:ring-indigo-500/50"
            >

              <div className="relative space-y-4">
                {/* Tool Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1">{tool.pricing}</p>
                  </div>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm ring-1 ring-inset ring-indigo-500/30">
                    {tool.name.charAt(0)}
                  </div>
                </div>

                {/* Professions using this tool */}
                {tool.professions.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs font-medium text-neutral-500 mb-2">Used by:</p>
                    <div className="flex flex-wrap gap-2">
                      {tool.professions.map((item) => (
                        <Link
                          key={item.profession.slug}
                          href={`/ai-tools-for/${item.profession.slug}`}
                          className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-white/10 hover:bg-white/10 transition-colors"
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
                  className="mt-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-200"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-indigo-600/20 border border-indigo-500/30 rounded-3xl mx-auto max-w-7xl px-6 lg:px-8 mb-16 py-16 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
            Looking for tools for a specific profession?
          </h2>
          <Link
            href="/professions"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-neutral-100 transition-colors"
          >
            Browse by Profession
          </Link>
        </div>
      </section>
    </main>
  );
}
